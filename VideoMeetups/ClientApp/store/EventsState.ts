import { MyEventItemDto } from "../mappers/MyEventItemDto";

export interface EventsState {
    isLoading: boolean;

    events: MyEventItemDto[];
}