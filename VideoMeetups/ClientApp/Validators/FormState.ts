import { FieldState, IFieldStateBuilder, IFieldState } from "./FieldState";

export class FormState<TState> {
    private readonly _fieldNames: (keyof TState)[];
    public readonly _fields: { [fieldName in keyof TState]: FieldState<any> };
    private readonly _setState: (stateChange: any) => void;

    constructor(state: TState, setState: (stateChanges: any) => void) {
        this._fieldNames = Object.keys(state).map(fieldName => fieldName as keyof TState);

        this.Fields = this._fields = {} as { [fieldName in keyof TState]: FieldState<any> };
        this.ValidationErrors = {} as { [fieldName in keyof TState]: string[] };
        for (const fieldName of this._fieldNames) {
            const fieldState = new FieldState<any>(fieldName, state[fieldName]);

            this._fields[fieldName] = fieldState;
            this.ValidationErrors[fieldName] = fieldState.ValidationErrors;
        }

        this._setState = setState;
        this.OnChange = this.OnChange.bind(this);
    }

    public GetValue<TField>(fieldName: keyof TState): TField {
        return this._fields[fieldName].Value;
    }

    public readonly Fields: { [fieldName in keyof TState]: IFieldState<any> };
    public ValidationErrors: { [fieldName in keyof TState]: string[] };
    public get IsCurrentlyValid(): boolean {
        return this.GetFields().every(f => f.IsValid);
    }

    public OnChange<TField>(fieldName: keyof TState, value: TField) {
        this._fields[fieldName].OnChange(value);

        const change = {} as { [fieldName in keyof TState]: TField };
        change[fieldName] = this.GetValue<TField>(fieldName);

        this._setState(change);
    }

    public Field<TField>(fieldName: keyof TState, buildField: (b: IFieldStateBuilder<TField>) => IFieldStateBuilder<TField> | void): FormState<TState> {
        const field = this._fields[fieldName];

        buildField(field);

        return this;
    }

    public Validate(): Promise<{ [fieldName in keyof TState]: string[] } | false> {
        const validationResultPromises = this.GetFields().map(field => field.Validate()
            .then(validationResult => ({ fieldName: field.FieldName as keyof TState, validationResult }))
        );

        return Promise.all(validationResultPromises)
            .then(validationResults =>
                validationResults.reduce(
                    (agg, vr) => {
                        if (vr.validationResult) {
                            if (!agg) {
                                agg = {} as { [fieldName in keyof TState]: string[] };
                            }
                            const aggValue = agg as { [fieldName in keyof TState]: string[] };

                            aggValue[vr.fieldName] = vr.validationResult as string[];
                        }

                        return agg;
                    },
                    null as { [fieldName in keyof TState]: string[] } | null
                )
            )
            .then(vr => vr || false);
    }

    private GetFields(): FieldState<any>[] {
        return this._fieldNames.map(fieldName => this._fields[fieldName]);
    }

    public Dispose() {
        for (const field of this.GetFields()) {
            field.Dispose();
            delete this._fields[field.FieldName as keyof TState];
        }

        this._fieldNames.length = 0;
    }
}