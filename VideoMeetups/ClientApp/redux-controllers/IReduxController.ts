import { EventsState } from "../store/EventsState";
import { Action } from "redux";
import { ApplicationState } from "../store";

export interface IReduxController<TState = {}, TAction = {}> {
    Reduce(state: TState, incomingAction: TAction): TState;
    FilterState(appState: ApplicationState): TState;
}