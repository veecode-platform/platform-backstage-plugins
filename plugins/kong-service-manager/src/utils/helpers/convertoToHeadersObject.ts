import { HeaderObj, Headers } from "../types";

export function convertToHeadersObject(arr: HeaderObj[]): Headers {
    const headers: { [key: string]: string[] } = {};

    arr.forEach(obj => {
        if (!headers[obj.id]) {
            headers[obj.id] = [];
        }
        headers[obj.id].push(obj.value);
    });

    return { headers };
  }