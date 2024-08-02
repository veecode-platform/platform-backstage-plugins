export const convertCpuValues = (value: string) : number => {
    const splited = value.split(/(?=[a-zA-z])|(?<=[a-zA-z])/g)

    if (splited.length === 1) return Number(value)

    switch (splited[1].toLowerCase()) {
        case "m":
            return Number(splited[0]) / 1000

        default:
            return Number(splited[0])
    }
}
