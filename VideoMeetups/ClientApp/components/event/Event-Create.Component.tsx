import { Component } from "react";
import * as React from "react";
import * as Moment from "moment";
import DatePicker from "react-datepicker";
import { IEventCreateModel } from "../../models/event/IEvent-Create.Model";
import { RouteComponentProps } from "react-router";
import { FormState } from "../../Validators/FormState";
import { CreateValidator } from "../../Validators/Create.Validator";
import { RequiredValidate } from "../../Validators/Required.Validate";
import { IDateRangeOptions, RangeValidator } from "../../Validators/Range.Validate";
import { ApplicationState } from "../../store";
import { connect } from "react-redux";
import { DIContainer } from "../../DIContainer";
import { MyEventsReduxController, IMyEventsServiceDispatchers } from "../../redux-controllers/MyEventsReduxController";
import { EventsState } from "../../store/EventsState";
import { ReduxHelper } from "../../redux-controllers/ReduxHelper";

declare type EventCreateState = IEventCreateModel & { EndDate: Moment.Moment | null };
declare type EventCreateProps = IMyEventsServiceDispatchers & EventsState & RouteComponentProps<{}>;

class EventCreateComponent extends Component<EventCreateProps, EventCreateState> {
    public FormState: FormState<EventCreateState>;

    constructor(props: EventCreateProps, context: any) {
        super(props, context);

        this.state = {
            EventName: "",
            Description: "",
            StartDate: EventCreateComponent.getInitialStartDate(),
            Duration: null,
            EndDate: null
        };

        const createDateRangeValidator = (fieldName: string) => CreateValidator<Moment.Moment | null, IDateRangeOptions>(
            RangeValidator.MomentRangeValidate,
            (opts: IDateRangeOptions) => `The ${fieldName} must be between ${opts.MinDate ? opts.MinDate().format(this.DateTimeFormat) : ""} and ${opts.MaxDate ? opts.MaxDate().format(this.DateTimeFormat) : ""}`,
            { MinDate: () => Moment(), MaxDate: () => Moment().add(1, "years") }
        );

        this.FormState = new FormState<EventCreateState>(this.state, changes => this.setState(changes))
            .Field<string>("EventName", f => f.Validator(/*CreateValidator(RequiredValidate, "The Field Event Name is required")*/))
            .Field<Moment.Moment>("StartDate", f => f.Validator(
                CreateValidator(RequiredValidate, "The Field Start Date is required"),
                createDateRangeValidator("Start Date")
            ))
            .Field<Moment.Moment | null>("EndDate", f => f.Validator(
                createDateRangeValidator("End Date"),
                CreateValidator(date => !date || !this.state.StartDate || this.state.StartDate < date, "End Date must be greater then Start Date")
            ))
            .Dependency("StartDate", "EndDate");
    }

    componentWillUnmount() {
        this.FormState.Dispose();
    }

    private DateTimeFormat = "DD.MM.YYYY hh:mm A";

    private static getInitialStartDate() {
        const date = Moment().add(7, 'days');
        EventCreateComponent.roundMinutesTo(date, 15);

        return date;
    }

    private static roundMinutesTo(date: Moment.Moment, round: number) {
        date.minutes(Math.round(date.minutes() / round) * round);
    }

    private async submit(): Promise<any> {
        const validationResult = await this.FormState.Validate();
        if (validationResult)
            console.log(`Validation failed: ${JSON.stringify(validationResult)}`);
        else {
            let createEvent = await this.props.createEvent(this.state);
            if (!createEvent.IsValid) {
                this.FormState.SetValidationErrors(createEvent.ValidationErrors);
            }
        }
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
                            <input type="text" className={`form-control${this.FormState.Fields.EventName.IsValid ? "" : " has-error"}`} id="EventName" placeholder="Event Name"
                                value={this.FormState.GetValue("EventName")}
                                onChange={ev => this.FormState.OnChange("EventName", ev.target.value)}
                            />
                            {this.FormState.ValidationErrors["EventName"].map(error => <p key={error} className="validation-error">{error}</p>)}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group form-group-sm">
                            <label htmlFor="Description" className="control-label">Description</label>
                            <textarea type="text" className={`form-control${this.FormState.Fields.Description.IsValid ? "" : " has-error"}`}
                                id="Description" placeholder="Description"
                                value={this.FormState.GetValue("Description")}
                                onChange={ev => this.FormState.OnChange("Description", ev.target.value)} />
                            {this.FormState.ValidationErrors["Description"].map(error => <p key={error} className="validation-error">{error}</p>)}
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group form-group-sm">
                            <label htmlFor="EventDate" className="control-label">Start Date</label>
                            <DatePicker className={`form-control${this.FormState.Fields.StartDate.IsValid ? "" : " has-error"}`}
                                id="EventDate" timeFormat="hh:mm A" timeIntervals={15} showTimeSelect
                                selected={this.FormState.GetValue("StartDate")} required timeCaption="time" minDate={Moment().add(1, "day")}
                                onChange={date => this.FormState.OnChange("StartDate", date)} dateFormat={this.DateTimeFormat} />
                            {this.FormState.ValidationErrors["StartDate"].map(error => <p key={error} className="validation-error">{error}</p>)}
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group form-group-sm">
                            <label htmlFor="EventEndDate" className="control-label">End Date</label>
                            <DatePicker className={`form-control${this.FormState.Fields.EndDate.IsValid ? "" : " has-error"}`}
                                id="EventEndDate" timeFormat="hh:mm A" timeIntervals={15} showTimeSelect
                                selected={this.FormState.GetValue("EndDate")} required minDate={this.state.StartDate || Moment()}
                                onChange={date => this.FormState.OnChange("EndDate", date)} dateFormat={this.DateTimeFormat} />
                            {this.FormState.ValidationErrors["EndDate"].map(error => <p key={error} className="validation-error">{error}</p>)}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <button className="btn btn-primary" type="button" onClick={this.submit.bind(this)}>Schedule</button>
                </div>
            </div>
        );
    }
}

const reduxService = DIContainer.resolve<MyEventsReduxController>(MyEventsReduxController);

export default connect(
    ReduxHelper.GetStateFilter(reduxService), // Selects which state properties are merged into the component's props
    ReduxHelper.GetDispatchers<MyEventsReduxController, IMyEventsServiceDispatchers>(reduxService, "requestEvents", "createEvent")
)(EventCreateComponent) as typeof EventCreateComponent;