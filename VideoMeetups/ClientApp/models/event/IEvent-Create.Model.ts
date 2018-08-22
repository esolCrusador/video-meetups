import { Moment } from "moment";

export interface IEventCreateModel {
    EventName: string;
    Description: string;
    StartDate: Moment;
    Duration: number | null;
}