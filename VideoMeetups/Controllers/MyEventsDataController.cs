﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using VideoMeetups.Helpers;
using VideoMeetups.Logic.Contracts;
using VideoMeetups.Logic.DomainModels.Events;
using VideoMeetups.Models.Events;

namespace VideoMeetups.Controllers
{
    [Route("MyEvents")]
    public class MyEventsDataController: Controller
    {
        private readonly IMyEventsService _myEventsService;

        public MyEventsDataController(IMyEventsService myEventsService)
        {
            _myEventsService = myEventsService;
        }

        [HttpPost]
        [Route("")]
        public async Task<IActionResult> CreateEvent([FromBody]EventItemModel model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
                return Json(ModelState.GetValidationResult());

            var eventItem = Map(model);
            await _myEventsService.CreateEvent(eventItem, cancellationToken);

            return await GetEvents(cancellationToken);
        }

        [HttpGet]
        [Route("")]
        public async Task<IActionResult> GetEvents(CancellationToken cancellationToken)
        {
            var events = await _myEventsService.GetEvents(cancellationToken);

            return Json(events.Select(e => Map(e)).ToList());
        }


        private static void Map(EventItem eventItem, EventItemModel eventItemModel)
        {
            eventItemModel.EventId = eventItem.EventId;
            eventItemModel.EventName = eventItem.EventName;
            eventItemModel.Description = eventItem.Description;
            eventItemModel.StartDate = eventItem.StartDate;
            eventItemModel.Duration = eventItem.Duration;
        }
        private static void Map(EventItemModel eventItemModel, EventItem eventItem)
        {
            eventItem.EventId = eventItemModel.EventId;
            eventItem.EventName = eventItemModel.EventName;
            eventItem.Description = eventItemModel.Description;
            eventItem.StartDate = eventItemModel.StartDate;
            eventItem.Duration = eventItemModel.Duration;
        }

        private static EventItem Map(EventItemModel eventItemModel)
        {
            if (eventItemModel == null)
                return null;

            var eventItem = new EventItem();
            Map(eventItemModel, eventItem);

            return eventItem;
        }

        private static EventItemModel Map(EventItem eventItem)
        {
            if (eventItem == null)
                return null;

            var eventItemModel = new EventItemModel();
            Map(eventItem, eventItemModel);

            return eventItemModel;
        }
    }
}
