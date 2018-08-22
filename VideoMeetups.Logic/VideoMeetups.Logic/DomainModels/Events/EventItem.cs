using System;
using System.Collections.Generic;
using System.Text;

namespace VideoMeetups.Logic.DomainModels.Events
{
    public class EventItem
    {
        public string EventId { get; set; }
        public string EventName { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public int? Duration { get; set; }
    }
}
