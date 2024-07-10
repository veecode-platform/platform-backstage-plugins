export const regexFileName = (input: string) => {
    const fileName = input.match(/(?:[\w\d\-\.](?!\/))+$/) ?? ""
    return fileName[0]
}