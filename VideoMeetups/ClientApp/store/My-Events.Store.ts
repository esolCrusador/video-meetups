//import { fetch, addTask } from 'domain-task';
//import { Action, Reducer, ActionCreator } from 'redux';
//import { AppThunkAction } from './';
//import { IEventCreateModel } from '../models/event/IEvent-Edit.Model';

//// -----------------
//// STATE - This defines the type of data maintained in the Redux store.

//export interface EventsState {
//    isLoading: boolean;

//    events: IEventCreateModel[];
//}

//// -----------------
//// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
//// They do not themselves have any side-effects; they just describe something that is going to happen.

//interface RequestGetMyEventsAction {
//    type: 'MyEvents.Get',
//}

//interface ReceiveGetMyEventsAction {
//    type: 'MyEvents.Loaded',
//    events: IEventCreateModel[];
//}

//interface RequestCreateEventAction {
//    type: 'MyEvents.Create';
//    event: IEventCreateModel;
//}

//interface ReceiveCreateEventAction {
//    type: 'MyEvents.Created';
//    events: IEventCreateModel[]
//};

//// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
//// declared type strings (and not any other arbitrary string).
//type KnownAction = RequestGetMyEventsAction | ReceiveGetMyEventsAction | RequestCreateEventAction | ReceiveCreateEventAction;

//// ----------------
//// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
//// They don't directly mutate state, but they can have external side-effects (such as loading data).

//export const actionCreators = {
//    requestWeatherForecasts: (startDateIndex: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
//        // Only load data if it's something we don't already have (and are not already loading)
//        if (startDateIndex !== getState().weatherForecasts.startDateIndex) {
//            let fetchTask = fetch(`api/SampleData/WeatherForecasts?startDateIndex=${startDateIndex}`)
//                .then(response => response.json() as Promise<WeatherForecast[]>)
//                .then(data => {
//                    dispatch({ type: 'RECEIVE_WEATHER_FORECASTS', startDateIndex: startDateIndex, forecasts: data });
//                });

//            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
//            dispatch({ type: 'REQUEST_WEATHER_FORECASTS', startDateIndex: startDateIndex });
//        }
//    }
//};

//// ----------------
//// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

//const unloadedState: WeatherForecastsState = { forecasts: [], isLoading: false };

//export const reducer: Reducer<WeatherForecastsState> = (state: WeatherForecastsState, incomingAction: Action) => {
//    const action = incomingAction as KnownAction;
//    switch (action.type) {
//        case 'REQUEST_WEATHER_FORECASTS':
//            return {
//                startDateIndex: action.startDateIndex,
//                forecasts: state.forecasts,
//                isLoading: true
//            };
//        case 'RECEIVE_WEATHER_FORECASTS':
//            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
//            // handle out-of-order responses.
//            if (action.startDateIndex === state.startDateIndex) {
//                return {
//                    startDateIndex: action.startDateIndex,
//                    forecasts: action.forecasts,
//                    isLoading: false
//                };
//            }
//            break;
//        default:
//            // The following line guarantees that every action in the KnownAction union has been covered by a case above
//            const exhaustiveCheck: never = action;
//    }

//    return state || unloadedState;
//};
