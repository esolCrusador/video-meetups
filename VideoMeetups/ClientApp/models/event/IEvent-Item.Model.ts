import { IEventCreateModel } from "./IEvent-Create.Model";
import { Moment } from "moment";

export interface IEventItemModel extends IEventCreateModel {
    EventId: string;
    EndDate: Moment | null;
}