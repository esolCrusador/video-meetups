import { Component } from "react";
import * as React from "react";
import * as Moment from "moment";
import DatePicker from "react-datepicker";
import { IEventCreateModel } from "../../models/event/IEvent-Create.Model";
import { RouteComponentProps } from "react-router";

export class EventCreateComponent extends Component<RouteComponentProps<{}>, IEventCreateModel & { EndDate: Moment.Moment | null }> {
    constructor(props: RouteComponentProps<{}>, context: any) {
        super(props, context);

        this.state = {
            EventName: "New Event",
            Description: "",
            StartDate: EventCreateComponent.getInitialStartDate(),
            Duration: null,
            EndDate: null
        };
    }

    private static getInitialStartDate() {
        const date = Moment().add(7, 'days');
        EventCreateComponent.roundMinutesTo(date, 15);

        return date;
    }

    private static roundMinutesTo(date: Moment.Moment, round: number) {
        date.minutes(Math.round(date.minutes() / round) * round);
    }

    private handleChange(propertyName: keyof IEventCreateModel, value: any) {
        const newState: Pick<IEventCreateModel, never> = {};
        (newState as any)[propertyName] = value;

        this.setState(newState);
    }

    private setStartDate(value: Moment.Moment | null) {
        if (!value) {
            value = EventCreateComponent.getInitialStartDate();
        }
        let endDate: Moment.Moment | null = null;
        if (this.state.Duration) {
            endDate = value.clone().add(this.state.Duration, "minutes");
            EventCreateComponent.roundMinutesTo(endDate, 15);
        }

        this.setState({
            StartDate: value,
            EndDate: endDate
        });
    }

    private setEndDate(value: Moment.Moment | null) {
        if (value && value < this.state.StartDate)
            value = this.state.StartDate.clone().add(15, "minutes");

        this.setState({
            EndDate: value,
            Duration: value ? value.diff(this.state.StartDate, "minutes") : null
        });
    }

    public render() {
        return (
            <div className="container">
                <div className="row">
                    <h2>Schedule an event</h2>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group form-group-sm">
                            <label htmlFor="EventName" className="control-label">Event Name</label>
                            <input type="text" className="form-control" id="EventName" placeholder="Event Name"
                                value={this.state.EventName} required
                                onChange={ev => this.handleChange("EventName", ev.target.value)} />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group form-group-sm">
                            <label htmlFor="Description" className="control-label">Description</label>
                            <textarea type="text" className="form-control" id="Description" placeholder="Description"
                                value={this.state.Description}
                                onChange={ev => this.handleChange("Description", ev.target.value)} />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group form-group-sm">
                            <label htmlFor="EventDate" className="control-label">Start Date</label>
                            <DatePicker className="form-control" id="EventDate" timeFormat="hh:mm A" timeIntervals={15} showTimeSelect
                                selected={this.state.StartDate} required  timeCaption="time" minDate={Moment().add(1, "day")} 
                                onChange={date => this.setStartDate(date)} dateFormat="DD.MM.YYYY hh:mm A" />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group form-group-sm">
                            <label htmlFor="EventEndDate" className="control-label">End Date</label>
                            <DatePicker className="form-control" id="EventEndDate" timeFormat="hh:mm A" timeIntervals={15} showTimeSelect
                                selected={this.state.EndDate} required minDate={this.state.StartDate}
                                onChange={date => this.setEndDate(date)} dateFormat="DD.MM.YYYY hh:mm A" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}