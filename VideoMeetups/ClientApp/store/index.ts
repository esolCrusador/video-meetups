import * as WeatherForecasts from './WeatherForecasts';
import * as Counter from './Counter';
import { IServerInfoModel } from '../models/IServerInfo.Model';
import { DIContainer } from '../DIContainer';
import { MyEventsReduxController } from '../redux-controllers/MyEventsReduxController';
import { EventsState } from './EventsState';
import { ReduxHelper } from '../redux-controllers/ReduxHelper';

// The top-level state object
export interface ApplicationState {
    counter: Counter.CounterState;
    server: IServerInfoModel;
    weatherForecasts: WeatherForecasts.WeatherForecastsState;
    myEvents: EventsState;
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
    myEvents: ReduxHelper.GetReducer(DIContainer.resolve<MyEventsReduxController>(MyEventsReduxController))
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
