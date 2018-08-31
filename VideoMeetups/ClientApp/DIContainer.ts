import 'reflect-metadata';
import { Provider, ReflectiveInjector, Type } from "injection-js";

export class DIContainer {
    private static readonly _providers: Provider[] = [];
    private static _injector: ReflectiveInjector | null = null;

    public static register(provider: Provider) {
        DIContainer._providers.push(provider);
    }

    public static resolve<TService>(type: Type<TService>): TService {
        if (!DIContainer._injector)
            DIContainer._injector = ReflectiveInjector.resolveAndCreate(this._providers);

        return DIContainer._injector.get(type);
    }
}