import { AppThunkAction, ApplicationState } from "../store";
import { IReduxController } from "./IReduxController";

export class ReduxHelper {
    public static GetDispatchers<TController, TDispatchers>(service: TController, ...actions: (keyof TDispatchers)[]): { [action: string]: AppThunkAction<any> } {
        const resultObject = {} as { [action: string]: AppThunkAction<any> };
        for (const action of actions) {
            resultObject[action] = function () {
                const forwardArguments = new Array(arguments.length + 2);
                for (let i = 0; i < arguments.length; i++) {
                    forwardArguments[i] = arguments[i];
                }

                return (dispatch: (action: any) => void, getState: () => ApplicationState) => {
                    forwardArguments[forwardArguments.length - 2] = dispatch;
                    forwardArguments[forwardArguments.length - 1] = getState;

                    return ((service as any)[action] as Function).apply(service, forwardArguments);
                }
            }
        }

        return resultObject;
    }

    public static GetReducer<TState>(controller: IReduxController): (state: TState, action: any) => TState {
        return controller.Reduce.bind(controller);
    }

    public static GetStateFilter<TState>(controller: IReduxController): (appState: ApplicationState) => TState {
        return controller.FilterState.bind(this);
    }
}