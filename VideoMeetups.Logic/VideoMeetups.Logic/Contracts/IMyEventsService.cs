using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using VideoMeetups.Logic.DomainModels.Events;

namespace VideoMeetups.Logic.Contracts
{
    public interface IMyEventsService
    {
        Task CreateEvent(EventItem eventItem, CancellationToken cancellationToken);
        Task<IReadOnlyCollection<EventItem>> GetEvents(CancellationToken cancellationToken);
    }
}
