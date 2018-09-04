import 'reflect-metadata';

import { ApplicationState, AppThunkAction } from "../store";
import { Injectable, ReflectiveInjector } from "injection-js";
import { MyEventItemDto } from "../mappers/MyEventItemDto";
import { IEventCreateModel } from "../models/event/IEvent-Create.Model";
import { ExecutionResult } from "../models/ExecutionResult";
import { Reducer } from "redux";
import { Action } from "redux";
import { DIContainer } from "../DIContainer";
import { ApiUtil } from '../repositories/APIUtil';
import { EventsState } from '../store/EventsState';
import { IReduxController } from './IReduxController';

interface RequestGetMyEventsAction {
    type: 'MyEvents.Get',
}

interface ReceiveGetMyEventsAction {
    type: 'MyEvents.Loaded',
    events: MyEventItemDto[];
}

interface RequestCreateEventAction {
    type: 'MyEvents.Create';
    event: IEventCreateModel;
}

type KnownAction = RequestGetMyEventsAction | ReceiveGetMyEventsAction | RequestCreateEventAction;

export interface IMyEventsService {
    requestEvents(dispatch: (action: KnownAction) => void, getState: () => ApplicationState): void;
    createEvent(event: IEventCreateModel, dispatch: (action: KnownAction) => void, getState: () => ApplicationState): Promise<ExecutionResult<MyEventItemDto[]>>;
}

export interface IMyEventsServiceDispatchers {
    requestEvents(): void;
    createEvent(event: IEventCreateModel): Promise<ExecutionResult<MyEventItemDto[]>>;
}

@Injectable()
export class MyEventsReduxController implements IMyEventsService, IReduxController<EventsState, KnownAction> {
    constructor(private readonly apiUtil: ApiUtil) {
    }

    public FilterState(state: ApplicationState): EventsState {
        return state.myEvents;
    }

    public requestEvents(dispatch: (action: KnownAction) => void, getState: () => ApplicationState){
        if (getState().myEvents.isLoading === false) {
            this.apiUtil.ApiRequest<MyEventItemDto[]>("api/MyEvents", "GET")
                .then(data => {
                    dispatch({ type: 'MyEvents.Loaded', events: data.Data });
                });

            dispatch({ type: 'MyEvents.Get' });

            // Ensure server-side prerendering waits for this to complete
        }
    }

    public createEvent(event: IEventCreateModel, dispatch: (action: KnownAction) => void, getState: () => ApplicationState): Promise<ExecutionResult<MyEventItemDto[]>> {
        // Only load data if it's something we don't already have (and are not already loading)
        let fetchTask = this.apiUtil.ApiRequest<MyEventItemDto[]>("api/MyEvents", "POST", event)
            .then(data => {
                dispatch({ type: 'MyEvents.Loaded', events: data.Data });

                return data;
            });

        dispatch({ type: 'MyEvents.Create', event: event });

        return fetchTask;
    }

    public getDispatchers() {
        return {
            requestEvents: this.requestEvents,
            createEvent: this.createEvent
        }
    }

    public Reduce(state: EventsState, incomingAction: Action): EventsState {
        const action = incomingAction as KnownAction;
        switch (action.type) {
            case 'MyEvents.Create':
                return {
                    events: [],
                    isLoading: true
                };
            case 'MyEvents.Get':
                return {
                    events: [],
                    isLoading: true
                };
            case 'MyEvents.Loaded':
                return {
                    events: (incomingAction as ReceiveGetMyEventsAction).events,
                    isLoading: false
                }
            default:
                // The following line guarantees that every action in the KnownAction union has been covered by a case above
                const exhaustiveCheck: never = action;

                return state || { events: [], isLoading: false };
        };
    }
}

DIContainer.register(MyEventsReduxController);