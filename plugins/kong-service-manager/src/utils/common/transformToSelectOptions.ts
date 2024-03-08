type OptionProps = {
    label: string,
    value: string
}

export const transformToSelectOptions = (items: string[]) => {
    const options : OptionProps[] = items.map((item:string) => ({label: item, value: item}));
    return options
}