using Nest;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using VideoMeetups.Data.Entities;
using VideoMeetups.Data.Init;
using VideoMeetups.Logic;
using System.Linq;
using System.Collections;

namespace VideoMeetups.Data
{
    public class ElasticProvider
    {
        private readonly string _databaseName;
        private readonly ElasticClient _elasticClient;
        private readonly NameFormatter _nameFormatter;

        public ElasticProvider(string databaseName, NameFormatter nameFormatter)
        {
            _databaseName = nameFormatter.ToElasticName(databaseName);
            _elasticClient = new ElasticClient(new ConnectionSettings(new Uri("http://localhost:9200")));
            _nameFormatter = nameFormatter;
        }

        public async Task Create<TEntity>(TEntity entity, CancellationToken cancellationToken)
            where TEntity : class
        {
            var response = await _elasticClient.CreateAsync(entity, d => d.Index(_databaseName), cancellationToken);

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
            var response = await _elasticClient.GetAsync(new DocumentPath<TEntity>(entityId), d => d.Index(_databaseName), cancellationToken);
            if (!response.Found)
                return null;

            ValidateResponse(response);

            return response.Source;
        }

        public async Task<TEntity> FindByPredicate<TEntity>(Expression<Func<TEntity, bool>> predicate, CancellationToken cancellationToken)
            where TEntity : class
        {
            var response = await _elasticClient.SearchAsync<TEntity>(sd=>sd.Index(_databaseName).Query(TermBuilderVisitory<TEntity>.BuildQueryFromExpression(predicate)), cancellationToken);

            ValidateResponse(response);

            return response.Documents.FirstOrDefault();
        }

        public Task DeleteById<TEntity>(long entityId, CancellationToken cancellationToken)
            where TEntity : class
        {
            return DeleteById<TEntity>(new Id(entityId), cancellationToken);
        }

        private async Task DeleteById<TEntity>(Id entityId, CancellationToken cancellationToken)
            where TEntity : class
        {
            var response = await _elasticClient.DeleteAsync(new DocumentPath<TEntity>(entityId), d => d.Index(_databaseName), cancellationToken);
        }

        public async Task Update<TEntity>(TEntity entity, CancellationToken cancellationToken)
            where TEntity : class
        {
            var id = Id.From(entity);
            var response = await _elasticClient.UpdateAsync(new DocumentPath<TEntity>(id), d => d.Index(_databaseName).Doc(entity), cancellationToken);

            ValidateResponse(response);
        }

        public async Task CreateDatabaseIfNotExists()
        {
            var response = await _elasticClient.IndexExistsAsync(_databaseName);
            ValidateResponse(response);

            if (!response.Exists)
            {
                await _elasticClient.CreateIndexAsync(_databaseName);
            }
        }

        private class SampleType
        {
        }

        public async Task CreateMapping(Type entityType, CancellationToken cancellationToken)
        {
            Expression<Func<CancellationToken, Task<IPutMappingResponse>>> automapExpression =
                cancellation => _elasticClient.MapAsync<SampleType>(m => m.Index(_databaseName).AutoMap(null, 0), cancellation);

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
            _elasticClient.BulkAsync(new BulkRequest(_databaseName)
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
