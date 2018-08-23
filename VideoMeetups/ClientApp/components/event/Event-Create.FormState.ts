import { FieldState, FormState } from "formstate";
import { IEventCreateModel } from "../../models/event/IEvent-Create.Model";
import * as Moment from "moment";
import { CreateValidator } from "../../Validators/Create.Validator";
import { RequiredValidate } from "../../Validators/Required.Validate";
import { RangeValidator, IDateRangeOptions } from "../../Validators/Range.Validate";

export class EventCreateFormState {
    public EventName: FieldState<string>;
    public Description: FieldState<string>;
    public StartDate: FieldState<Moment.Moment | null>;
    private Duration: number | null;
    public EndDate: FieldState<Moment.Moment | null>;
    public DateTimeFormat: string;

    public Form: FormState<{
        EventName: FieldState<string>,
        Description: FieldState<string>,
        StartDate: FieldState<Moment.Moment | null>,
        EndDate: FieldState<Moment.Moment | null>
    }>;

    constructor(eventModel: IEventCreateModel) {
        this.DateTimeFormat = "DD.MM.YYYY hh:mm A";

        this.EventName = new FieldState<string>(eventModel.EventName).validators(CreateValidator(RequiredValidate, "The Event Name is required"));
        this.Description = new FieldState<string>(eventModel.Description);

        const createRangeValidator = (fieldName: string) => CreateValidator<Moment.Moment | null, IDateRangeOptions>(
            RangeValidator.MomentRangeValidate,
            (opts: IDateRangeOptions) => `The ${fieldName} must be between ${opts.MinDate ? opts.MinDate().format(this.DateTimeFormat) : ""} and ${opts.MaxDate ? opts.MaxDate().format(this.DateTimeFormat) : ""}`,
            { MinDate: () => Moment(), MaxDate: () => Moment().add(1, "years") }
        );

        this.StartDate = new FieldState<Moment.Moment | null>(eventModel.StartDate).validators(CreateValidator(RequiredValidate, "The Start Date is required"), createRangeValidator("Start Date"));
        this.Duration = eventModel.Duration;
        this.EndDate = new FieldState<Moment.Moment | null>(this.ComputeEndDate())
            .validators(
            createRangeValidator("End Date"),
            CreateValidator(date => !date || !this.StartDate.value || this.StartDate.value < date, "End Date must be less then Start Date")
        ).onDidChange((values) => {
            const date = values.newValue;
            if (this.StartDate.value) {
                if (!date) {
                    this.Duration = 0;
                }
                else {
                    this.Duration = date.diff(this.StartDate.value, "minutes");
                }
            }
            });

        this.Form = new FormState({
            EventName: this.EventName,
            Description: this.Description,
            StartDate: this.StartDate,
            EndDate: this.EndDate
        });
    }

    private ComputeEndDate(): Moment.Moment | null {
        return this.Duration && this.StartDate.value ? this.StartDate.value.clone().add(this.Duration, "minutes") : null;
    }

    public async getStateIfValid(): Promise<IEventCreateModel | false> {
        const validationResult = await this.Form.validate();
        if (!validationResult.hasError) {
            return {
                EventName: this.EventName.value,
                Description: this.Description.value,
                StartDate: this.StartDate.value || Moment(),
                Duration: this.Duration,
            };
        }

        return false;
    }
}