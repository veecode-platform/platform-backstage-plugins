import { Destination, Sources } from "../types";

interface Obj {
    id: string;
    value: string;
}

export function prepareDestinations(arr: Obj[]): Destination[] {
    return arr.map(obj => ({
        ip: obj.id,
        port: Number(obj.value)
    }));
}

export function prepareSources(arr: Obj[]): Sources[] {
    return arr.map(obj => ({
        ip: obj.id,
        port: Number(obj.value)
    }));
}
