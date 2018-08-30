import * as WeatherForecasts from './WeatherForecasts';
import * as Counter from './Counter';
import { IServerInfoModel } from '../models/IServerInfo.Model';
import * as MyEvents from './My-Events.Store';

// The top-level state object
export interface ApplicationState {
    counter: Counter.CounterState;
    server: IServerInfoModel;
    weatherForecasts: WeatherForecasts.WeatherForecastsState;
    myEvents: MyEvents.EventsState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer,
    server: (state: IServerInfoModel) => {
        return state || {};
    },
    myEvents: MyEvents.reducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
