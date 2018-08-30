import { Validator } from "./Validator";
import { routerMiddleware } from "react-router-redux";

export interface IFieldStateBuilder<TField> {
    Validator(...validators: Validator<TField>[]): IFieldStateBuilder<TField>;
    OnDidChange(handler: (oldValue: TField, newValue: TField) => void): IFieldStateBuilder<TField>;
}

export interface IFieldState<TField> {
    FieldName: string;
    Value: TField;
    IsDirty: boolean;
    ValidationErrors: string[];
    IsValid: boolean;
}

export class FieldState<TField> implements IFieldStateBuilder<TField> {
    public readonly FieldName: string;
    public Value: TField;
    public IsDirty: boolean;
    public ValidationErrors: string[];
    public IsValid: boolean;

    private _validators: Validator<TField>[] | null;
    private _didChangedHandlers: ((oldValue: TField, newValue: TField) => void)[] | null;

    constructor(fieldName: string, value: TField) {
        this.FieldName = fieldName;
        this.Value = value;
        this.IsDirty = false;
        this.IsValid = true;

        this._validators = null;
        this._didChangedHandlers = null;
        this.ValidationErrors = [];
    }

    public Validator(...validators: Validator<TField>[]): IFieldStateBuilder<TField> {
        (this._validators || (this._validators = [])).push(...validators);

        return this;
    }

    public async Validate(): Promise<string[] | false> {
        if (!this._validators)
            return false;

        const validateResults = this._validators.map(v => v(this.Value));

        this.ValidationErrors.length = 0;
        for (let i = 0; i < validateResults.length; i++) {
            const result = validateResults[i];
            let resultValue: string | false;

            if (result && typeof result === "object" && result instanceof Promise)
                resultValue = await result;
            else
                resultValue = result as string | false;

            if (resultValue !== false)
                this.ValidationErrors.push(resultValue);
        }

        this.IsValid = this.ValidationErrors.length === 0;

        return this.ValidationErrors.length !== 0 && this.ValidationErrors;
    }

    public SetValidationErrors(errors: string[]): void {
        this.ValidationErrors.length = 0;
        this.ValidationErrors.push(...errors);
    }

    public OnChange(value: TField) {
        const oldValue = this.Value;

        this.IsDirty = true;
        this.Value = value;
        const validate = this.Validate();

        if (this._didChangedHandlers) {
            validate.then(() => {
                if (this._didChangedHandlers)
                    for (const handler of this._didChangedHandlers) {
                        handler(oldValue, this.Value);
                    }
            });
        }
    }

    public OnDidChange(handler: (oldValue: TField, newValue: TField) => void): IFieldStateBuilder<TField>{
        (this._didChangedHandlers || (this._didChangedHandlers = [])).push(handler);

        return this;
    }

    public Dispose() {
        if (this._didChangedHandlers) {
            this._didChangedHandlers.length = 0;
            this._didChangedHandlers = null;
        }
    }
}