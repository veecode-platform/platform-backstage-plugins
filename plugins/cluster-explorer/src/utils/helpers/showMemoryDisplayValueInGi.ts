export const showMemoryDisplayValueInGi = (valueInKi: number) : string => {
    return `${(valueInKi / 1024 ** 2).toFixed(2)} Gi`
}