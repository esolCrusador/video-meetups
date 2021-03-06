﻿import { RouteComponentProps } from "react-router";
import * as React from "react";
import { ApplicationState } from "../../store";
import { connect } from "react-redux";
import { EventMapper } from "../../mappers/EventMapper";
import { IMyEventsService, MyEventsReduxController, IMyEventsServiceDispatchers } from "../../redux-controllers/MyEventsReduxController";
import { DIContainer } from "../../DIContainer";
import { EventsState } from "../../store/EventsState";
import { ReduxHelper } from "../../redux-controllers/ReduxHelper";

declare type EventsListState = {};
declare type EventCreateProps = IMyEventsServiceDispatchers & EventsState & RouteComponentProps<{}>;

class MyEventsComponent extends React.Component<EventCreateProps, EventsListState>{
    componentWillMount() {
        if (!this.props.events || this.props.events.length === 0)
            this.props.requestEvents();
    }

    componentWillReceiveProps(nextProps: EventCreateProps) {
    }

    render() {
        const events = EventMapper.MapMyEvents(this.props.events);

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h4>My Events</h4>
                        <div className="table-responsive">
                            <table id="mytable" className="table table-bordred table-striped">
                                <thead>
                                    <tr>
                                        <th>Event Name</th>
                                        <th>Description</th>
                                        <th>Date</th>
                                        <th>Duration</th>
                                        <th>End Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.map(ev =>
                                        <tr key={ev.EventId}>
                                            <td>{ev.EventName}</td>
                                            <td>{ev.Description}</td>
                                            <td>{ev.StartDate.format("DD.MM.YYYY")}</td>
                                            <td>{ev.StartDate.format("hh:mm A")} - {ev.EndDate ? ev.EndDate.format("hh:mm A") : "..."}</td>
                                            <td>Actions</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="clearfix"></div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

const controller = DIContainer.resolve<MyEventsReduxController>(MyEventsReduxController);

export default connect(
    ReduxHelper.GetStateFilter<EventsState>(controller), // Selects which state properties are merged into the component's props
    ReduxHelper.GetDispatchers<MyEventsReduxController, IMyEventsServiceDispatchers>(controller, "requestEvents") // Selects which action creators are merged into the component's props
)(MyEventsComponent) as typeof MyEventsComponent;