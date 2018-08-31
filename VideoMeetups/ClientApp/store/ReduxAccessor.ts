import "reflect-metadata";

import { Injectable } from "injection-js";
import { Store } from "redux";
import { ApplicationState } from "./index";
import { DIContainer } from "../DIContainer";

@Injectable()
export class ReduxAccessor {
    private static _store: Store<ApplicationState>;

    public static SetStore(store: Store<ApplicationState>): void {
        this._store = store;
    }

    public GetServerMetadata() {
        return this.GetState().server;
    }

    private GetState(): ApplicationState {
        return ReduxAccessor._store.getState();
    }
}

DIContainer.register(ReduxAccessor);