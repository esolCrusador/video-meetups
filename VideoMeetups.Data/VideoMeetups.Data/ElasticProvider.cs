using Nest;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using VideoMeetups.Logic;
using System.Linq;
using System.Collections;

namespace VideoMeetups.Data
{
    public class ElasticProvider
    {
        private readonly string _databaseNamePrefix;
        private readonly ElasticClient _elasticClient;
        private readonly NameFormatter _nameFormatter;

        public ElasticProvider(string databaseNamePrefix, NameFormatter nameFormatter)
        {
            _databaseNamePrefix = nameFormatter.ToElasticName(databaseNamePrefix);
            _elasticClient = new ElasticClient(new ConnectionSettings(new Uri("http://localhost:9200")));
            _nameFormatter = nameFormatter;
        }

        private string GetIndexName<TEntity>()
        {
            return GetIndexName(typeof(TEntity));
        }

        private string GetIndexName(Type entityType)
        {
            return _databaseNamePrefix + "_" + _nameFormatter.GetIndexPostfix(entityType);
        }

        public async Task Create<TEntity>(TEntity entity, Elasticsearch.Net.Refresh? refreshOptions = null, CancellationToken cancellationToken = default(CancellationToken))
            where TEntity : class
        {
            var response = await _elasticClient.CreateAsync(entity, d => d.Index(GetIndexName<TEntity>()).Refresh(refreshOptions), cancellationToken);

            ValidateResponse(response);
        }

        public Task<TEntity> FindById<TEntity>(string entityId, CancellationToken cancellationToken)
            where TEntity : class
        {
            return FindById<TEntity>(new Id(entityId), cancellationToken);
        }

        public Task<TEntity> FindById<TEntity>(long entityId, CancellationToken cancellationToken)
            where TEntity : class
        {
            return FindById<TEntity>(new Id(entityId), cancellationToken);
        }

        private async Task<TEntity> FindById<TEntity>(Id entityId, CancellationToken cancellationToken)
            where TEntity: class
        {
            var response = await _elasticClient.GetAsync(new DocumentPath<TEntity>(entityId), d => d.Index(GetIndexName<TEntity>()), cancellationToken);
            if (!response.Found)
                return null;

            ValidateResponse(response);

            return response.Source;
        }

        public async Task<TEntity> FindSingleByPredicate<TEntity>(Expression<Func<TEntity, bool>> predicate, CancellationToken cancellationToken)
            where TEntity : class
        {
            var response = await _elasticClient.SearchAsync<TEntity>(sd=>sd.Index(GetIndexName<TEntity>()).Query(TermBuilderVisitory<TEntity>.BuildQueryFromExpression(predicate)), cancellationToken);

            ValidateResponse(response);

            return response.Documents.SingleOrDefault();
        }

        public async Task<IReadOnlyCollection<TEntity>> FindByPredicate<TEntity>(Expression<Func<TEntity, bool>> predicate, CancellationToken cancellationToken)
            where TEntity : class
        {
            var response = await _elasticClient.SearchAsync<TEntity>(sd => sd.Index(GetIndexName<TEntity>()).Query(TermBuilderVisitory<TEntity>.BuildQueryFromExpression(predicate)), cancellationToken);

            ValidateResponse(response);

            return response.Documents;
        }

        public Task DeleteById<TEntity>(long entityId, CancellationToken cancellationToken)
            where TEntity : class
        {
            return DeleteById<TEntity>(new Id(entityId), cancellationToken);
        }

        private async Task DeleteById<TEntity>(Id entityId, CancellationToken cancellationToken)
            where TEntity : class
        {
            var response = await _elasticClient.DeleteAsync(new DocumentPath<TEntity>(entityId), d => d.Index(GetIndexName<TEntity>()), cancellationToken);
        }

        public async Task Update<TEntity>(TEntity entity, CancellationToken cancellationToken)
            where TEntity : class
        {
            var id = Id.From(entity);
            var response = await _elasticClient.UpdateAsync(new DocumentPath<TEntity>(id), d => d.Index(GetIndexName<TEntity>()).Doc(entity), cancellationToken);

            ValidateResponse(response);
        }

        public async Task CreateDatabaseIfNotExists(Type entityType)
        {
            var response = await _elasticClient.IndexExistsAsync(GetIndexName(entityType));
            ValidateResponse(response);

            if (!response.Exists)
            {
                await _elasticClient.CreateIndexAsync(GetIndexName(entityType));
            }
        }

        private class SampleType
        {
        }

        public async Task CreateMapping(Type entityType, CancellationToken cancellationToken)
        {
            Expression<Func<CancellationToken, Task<IPutMappingResponse>>> automapExpression =
                cancellation => _elasticClient.MapAsync<SampleType>(m => m.Index(GetIndexName(entityType)).AutoMap(null, 0), cancellation);

            var nexExpression = automapExpression.ChangeGenericParam(typeof(SampleType), entityType);

            var response = await nexExpression.Compile()(cancellationToken);

            ValidateResponse(response);
        }

        public async Task InitializeData(Type entitityType, IEnumerable data, CancellationToken cancellationToken)
        {
            // Empty 
            if (!data.GetEnumerator().MoveNext())
                return;

            Expression<Func<IEnumerable, CancellationToken, Task<IBulkResponse>>> bulkExpression = (entities, cancellation) =>
            _elasticClient.BulkAsync(new BulkRequest(GetIndexName(entitityType))
            {
                Operations = entities.Cast<SampleType>().Select(e => new BulkCreateOperation<SampleType>(e)).Cast<IBulkOperation>().ToList()
            }, cancellation);

            var newExpression = bulkExpression.ChangeGenericParam(typeof(SampleType), entitityType);

            var response = await newExpression.Compile()(data, cancellationToken);

            ValidateResponse(response);
        }

        private void ValidateResponse(IResponse response)
        {
            if (!response.IsValid)
            {
                throw response.OriginalException;
            }
        }
    }
}
