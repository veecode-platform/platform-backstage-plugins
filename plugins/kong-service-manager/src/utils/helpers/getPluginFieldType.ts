export function getPluginFieldType(type: string) {
    switch (type) {
        case "string":
            return "string"

        case "number":
        case "integer":
            return "number"

        case "boolean":
            return "boolean"

        case "array":
            return "array"

        case "record":
            return "record"
        default:
            return "string"
    }
}