using System;
using System.ComponentModel.DataAnnotations;

namespace VideoMeetups.Models.Events
{
    public class EventItemModel
    {
        public string EventId { get; set; }
        [Required]
        public string EventName { get; set; }
        public string Description { get; set; }
        [Required]
        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }
        public int? Duration { get; set; }
    }
}
