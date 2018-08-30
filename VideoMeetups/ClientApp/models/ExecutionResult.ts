export interface ExecutionResult<TData> {
    IsValid: boolean;
    ValidationErrors: { [propName: string]: string[] };
    Data: TData;
}