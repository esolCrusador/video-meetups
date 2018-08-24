export interface Validator<TModel> {
    (value: TModel): string | false | Promise<string | false>;
}