export const convertMemoryValues = (value: string) : number => {
    const splited = value.split(/(?=[a-zA-z])|(?<=[a-zA-z])/g)

    switch (splited[1].toLowerCase()) {
        case "k": // k
            return Number(splited[0])
        case "m":
            return Number(splited[0]) / 1024 // k*1024
        case "g":
            return Number(splited[0]) / 1024 ** 2 // k*1024*2
        case "t":
            return Number(splited[0]) / 1024 ** 3 // k*1024*3
        case "p":
            return Number(splited[0]) / 1024 ** 4 // k*1024*4
        default:
            return Number(splited[0])
    }
}