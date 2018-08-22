using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using VideoMeetups.Logic.DomainModels.Events;

namespace VideoMeetups.Logic.Repositories
{
    public interface IEventsRepository
    {
        Task CreateEvent(long userId, EventItem eventItem, CancellationToken cancellationToken);
        Task<IReadOnlyCollection<EventItem>> GetEvents(long userId, CancellationToken cancellationToken);
    }
}
