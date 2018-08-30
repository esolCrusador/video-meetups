import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import { IEventCreateModel } from '../models/event/IEvent-Create.Model';
import { IEventItemModel } from '../models/event/IEvent-Item.Model';
import { ExecutionResult } from '../models/ExecutionResult';
import { MyEventItemDto } from '../mappers/MyEventItemDto';
import { EventMapper } from '../mappers/EventMapper';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface EventsState {
    isLoading: boolean;

    events: MyEventItemDto[];
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

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

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestGetMyEventsAction | ReceiveGetMyEventsAction | RequestCreateEventAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestEvents: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        if (getState().myEvents.isLoading === false) {
            const token = getState().server.token;
            let fetchTask = fetch(`api/MyEvents`, { headers: { "Authorization": `Bearer ${token}` } })
                .then(response => response.json() as Promise<ExecutionResult<MyEventItemDto[]>>)
                .then(data => {
                    dispatch({ type: 'MyEvents.Loaded', events: data.Data });
                });

            dispatch({ type: 'MyEvents.Get' });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        }
    },

    createEvent: (event: IEventCreateModel): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const token = getState().server.token;
        // Only load data if it's something we don't already have (and are not already loading)
        let fetchTask = fetch(`api/MyEvents`, { method: "POST", body: JSON.stringify(event), headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}`} })
            .then(response => response.json() as Promise<ExecutionResult<MyEventItemDto[]>>)
            .then(data => {
                dispatch({ type: 'MyEvents.Loaded', events: data.Data});

                return data;
            });

        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        dispatch({ type: 'MyEvents.Create', event: event });

        return fetchTask;
    }
};

export interface createEvent {
    (event: IEventCreateModel): Promise<ExecutionResult<IEventItemModel>>;
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: EventsState = { events: [], isLoading: false };

export const reducer: Reducer<EventsState> = (state: EventsState, incomingAction: Action) => {
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

            return state || unloadedState;
    };
}