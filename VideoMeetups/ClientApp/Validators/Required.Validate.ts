export function RequiredValidate<TValue>(value: TValue): boolean {
    if (value === undefined || value === null) {
        return false;
    }
    switch (typeof value) {
        case "string":
            if ((value as any as string) === "") {
                return false;
            }
            break;
        default:
            return true;
    }

    return true;
}