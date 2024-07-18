import { HeaderObj } from "../types";

export function convertToHeadersObject(arr: HeaderObj[]): { [key: string]: string[]; } {
    const headers: { [key: string]: string[] } = {};

    arr.forEach(obj => {
        if (!headers[obj.id]) {
            headers[obj.id] = [];
        }
        headers[obj.id].push(obj.value);
    });

    return headers;
}
