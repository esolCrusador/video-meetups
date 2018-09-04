import "reflect-metadata";
import { Injectable } from "injection-js";
import { DIContainer } from "../../DIContainer";
import { RoutePaths } from "./RoutePaths";
import { RouteName } from "./RouteName";

@Injectable()
export class CommonNavigationService {
    private readonly _routesMap: { [route: number]: { url: string } };

    constructor() {
        this._routesMap = {};

        this._routesMap[RouteName.EventsList] = { url: RoutePaths.MyEventsList };
        this._routesMap[RouteName.CreateEvent] = { url: RoutePaths.CreateEvent };
    }

    public GetPath(routeName: RouteName, parameters: any): string {
        return this._routesMap[routeName].url;
    }

    public NavigateTo(routeName: RouteName, parameters: any) {
        const path = this.GetPath(routeName, parameters);


    }
}

DIContainer.register(CommonNavigationService);