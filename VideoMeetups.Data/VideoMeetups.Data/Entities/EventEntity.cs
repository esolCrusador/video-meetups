using Nest;
using System;

namespace VideoMeetups.Data.Entities
{
    [ElasticsearchType(Name = "event_entity", IdProperty = nameof(EventId))]
    public class EventEntity
    {
        public string EventId { get; set; }
        public long UserId { get; set; }
        public string EventName { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public int? Duration { get; set; }
    }
}
