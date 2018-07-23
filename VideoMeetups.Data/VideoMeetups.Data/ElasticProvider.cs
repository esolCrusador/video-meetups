using Nest;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using VideoMeetups.Data.Entities;
using VideoMeetups.Logic;

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

        public async Task CreateDatabaseIfNotExists()
        {
            var response = await _elasticClient.IndexExistsAsync(_databaseName);
            ValidateResponse(response);

            if (!response.Exists)
            {
                await _elasticClient.CreateIndexAsync(_databaseName);
            }
        }

        public async Task CreateMapping(Type entityType, CancellationToken cancellationToken)
        {
            Expression<Func<CancellationToken, Task<IPutMappingResponse>>> automapExpression =
                cancellation => _elasticClient.MapAsync<object>(m => m.Index(_databaseName).AutoMap(null, 0), cancellation);

            var nexExpression = automapExpression.ChangeGenericParam(typeof(object), entityType);

            var response = await nexExpression.Compile()(cancellationToken);

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
