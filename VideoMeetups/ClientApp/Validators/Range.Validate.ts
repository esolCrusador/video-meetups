import { Moment } from "moment";

export interface IDateRangeOptions {
    MinDate?: () => Moment;
    MaxDate?: () => Moment;
}

export class RangeValidator {
    public static MomentRangeValidate(value: Moment | null, options?: IDateRangeOptions): boolean {
        if (!options) {
            throw new Error("Please specify options");
        }

        return !value || (!options.MinDate || value >= options.MinDate()) && (!options.MaxDate || value <= options.MaxDate());
    }
}