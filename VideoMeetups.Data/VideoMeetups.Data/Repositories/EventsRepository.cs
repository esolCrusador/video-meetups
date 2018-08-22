using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using VideoMeetups.Data.Entities;
using VideoMeetups.Logic.DomainModels.Events;
using VideoMeetups.Logic.Repositories;

namespace VideoMeetups.Data.Repositories
{
    public class EventsRepository : IEventsRepository
    {
        private readonly ElasticProvider _elasticProvider;

        public EventsRepository(ElasticProvider elasticProvider)
        {
            _elasticProvider = elasticProvider;
        }

        public async Task CreateEvent(long userId, EventItem eventItem, CancellationToken cancellationToken)
        {
            var eventEntity = Map(eventItem);
            eventEntity.UserId = userId;
            eventEntity.EventId = Guid.NewGuid().ToString("n");

            await _elasticProvider.Create<EventEntity>(eventEntity, Elasticsearch.Net.Refresh.True, cancellationToken);
        }

        public async Task<IReadOnlyCollection<EventItem>> GetEvents(long userId, CancellationToken cancellationToken)
        {
            var eventEntities = await _elasticProvider.FindByPredicate<EventEntity>(ev => ev.UserId == userId, cancellationToken);

            return eventEntities.Select(ev => Map(ev)).ToList();
        }

        private static void Map(EventItem eventItem, EventEntity eventEntity)
        {
            eventEntity.EventId = eventItem.EventId;
            eventEntity.EventName = eventItem.EventName;
            eventEntity.Description = eventItem.Description;
            eventEntity.StartDate = eventItem.StartDate;
            eventEntity.Duration = eventItem.Duration;
        }
        private static void Map(EventEntity eventEntity, EventItem eventItem)
        {
            eventItem.EventId = eventEntity.EventId;
            eventItem.EventName = eventEntity.EventName;
            eventItem.Description = eventEntity.Description;
            eventItem.StartDate = eventEntity.StartDate;
            eventItem.Duration = eventEntity.Duration;
        }

        private static EventItem Map(EventEntity eventEntity)
        {
            if (eventEntity == null)
                return null;

            var eventItem = new EventItem();
            Map(eventEntity, eventItem);

            return eventItem;
        }

        private static EventEntity Map(EventItem eventItem)
        {
            if (eventItem == null)
                return null;

            var eventEntity = new EventEntity();
            Map(eventItem, eventEntity);

            return eventEntity;
        }
    }
}
