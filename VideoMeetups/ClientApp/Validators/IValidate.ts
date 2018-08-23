export interface IShortValidate<TValue> {
    (val: TValue): boolean;
}

export interface IValidate<TValue, TOptions> {
    (val: TValue, opts: TOptions): boolean;
}