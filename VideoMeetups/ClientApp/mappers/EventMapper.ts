import { IEventItemModel } from "../models/event/IEvent-Item.Model";
import * as Momonet from "moment";
import { ExecutionResult } from "../models/ExecutionResult";
import { MyEventItemDto } from "./MyEventItemDto";

export class EventMapper {
    public static MapMyEvent(source: MyEventItemDto, dest?: IEventItemModel): IEventItemModel {
        if (!dest) {
            dest = {} as any as IEventItemModel;
        }
        dest.EventId = source.EventId;
        dest.EventName = source.EventName;
        dest.Description = source.Description;
        dest.StartDate = Momonet(source.StartDate);
        dest.Duration = source.Duration;
        dest.EndDate = source.Duration ? dest.StartDate.clone().add(source.Duration, "minutes") : null;

        return dest;
    }

    public static MapMyEvents(source: MyEventItemDto[] | ExecutionResult<MyEventItemDto[]> | any): IEventItemModel[] {
        let ev: MyEventItemDto[];
        if (Array.isArray(source)) {
            return (source as MyEventItemDto[]).map(ev => EventMapper.MapMyEvent(ev));
        }
        else {
            const result = source as ExecutionResult<MyEventItemDto[]>;
            if (!result.IsValid) {
                throw new Error(JSON.stringify(result.ValidationErrors));
            }

            return EventMapper.MapMyEvents(result.Data);
        }
    }
}