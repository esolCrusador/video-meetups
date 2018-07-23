using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace VideoMeetups.Data.Init
{
    public class Initializer
    {
        private IEnumerable<IDataInitializer> _initializers;
        private ElasticProvider _elasticProvider;
        private PropertyMetadataResolver _propertyMetadataResolver;

        public Initializer(IEnumerable<IDataInitializer> initializers, ElasticProvider elasticProvider, PropertyMetadataResolver propertyMetadataResolver)
        {
            _initializers = initializers;
            _elasticProvider = elasticProvider;
            _propertyMetadataResolver = propertyMetadataResolver;
        }

        public async Task Initialize(CancellationToken cancellationToken)
        {
            await _elasticProvider.CreateDatabaseIfNotExists();

            foreach (var initializer in _initializers)
            {
                cancellationToken.ThrowIfCancellationRequested();

                var entitites = initializer.GetInitialEntities();
                var entityType = initializer.GetEntityType();

                await _elasticProvider.CreateMapping(entityType, cancellationToken);
            }
        }

    }
}
