export function RequiredValidate<TValue>(value: TValue): boolean {
    if (value !== undefined && value !== null) {
        return true;
    }
    switch (typeof value) {
        case "string":
            if (value !== "") {
                return true;
            }
            break;
        default:
            return true;
    }

    return false;
}