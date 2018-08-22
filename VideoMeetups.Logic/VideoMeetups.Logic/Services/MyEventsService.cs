using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using VideoMeetups.Logic.Contracts;
using VideoMeetups.Logic.DomainModels.Events;
using VideoMeetups.Logic.Repositories;

namespace VideoMeetups.Logic.Services
{
    public class MyEventsService : IMyEventsService
    {
        private readonly long _userId;
        private readonly IEventsRepository _eventsRepository;

        public MyEventsService(IUserContextContainer userContextContainer, IEventsRepository eventsRepository)
        {
            var userId = userContextContainer.UserId;
            if (!userId.HasValue)
                throw new UnauthorizedAccessException("The user is not authenticated");

            _userId = userId.Value;
            _eventsRepository = eventsRepository;
        }
        public async Task CreateEvent(EventItem eventItem, CancellationToken cancellationToken)
        {
            await _eventsRepository.CreateEvent(_userId, eventItem, cancellationToken);
        }

        public async Task<IReadOnlyCollection<EventItem>> GetEvents(CancellationToken cancellationToken)
        {
            return await _eventsRepository.GetEvents(_userId, cancellationToken);
        }
    }
}
