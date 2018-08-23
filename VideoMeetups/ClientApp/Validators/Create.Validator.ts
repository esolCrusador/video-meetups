import { Validator } from "formstate";
import { IValidate, IShortValidate } from "./IValidate";
import { IGetErrorMessage } from "./IGetErrorMessage";
import { RelativeTimeFuturePastVal } from "moment";

export function CreateValidator<TValue>(isValid: IShortValidate<TValue>, errorMessage: string): Validator<TValue>;
export function CreateValidator<TValue>(isValid: IShortValidate<TValue>, errorMessage: () => string): Validator<TValue>;
export function CreateValidator<TValue, TOptions>(isValid: IValidate<TValue, TOptions>, errorMessage: string, options: TOptions): Validator<TValue>;
export function CreateValidator<TValue, TOptions>(isValid: IValidate<TValue, TOptions>, errorMessage: IGetErrorMessage<TOptions>, options: TOptions): Validator<TValue>;
export function CreateValidator<TValue>(): Validator<TValue>
{
    const isValid = arguments[0] as Function;
    const errorMessage = arguments[1];
    const options = arguments.length >= 2 ? arguments[2] : null;

    if (typeof errorMessage === "string")
        return (val) => (options ? isValid(val, options) : isValid(val)) ? false : errorMessage;
    else if (typeof errorMessage === "function")
        return (val: TValue) => options ? (isValid(val, options) ? false : errorMessage(options)) : (isValid(val) ? false : errorMessage());
    else
        throw new Error("Please specify errorMessage");
}