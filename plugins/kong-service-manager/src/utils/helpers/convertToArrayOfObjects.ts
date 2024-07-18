interface Obj {
    id: string;
    value: string;
}

export function convertToArrayOfObjects(arr: string[] | null | undefined): Obj[] {
    if (!arr) return [];
    return arr.map((value, index) => ({
        id: (index + 1).toString(),
        value: value,
    }));
}

export function convertToObjArray(obj: { [key: string]: string[] } | null | undefined): Obj[] {
    const result: Obj[] = [];

    if (!obj) {
        return result;
    }

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            obj[key].forEach(value => {
                result.push({ id: key, value });
            });
        }
    }

    return result;
}
