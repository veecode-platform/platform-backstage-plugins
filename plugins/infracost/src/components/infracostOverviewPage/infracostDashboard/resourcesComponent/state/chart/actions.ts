import { ChartItem } from "../../chart/types";
import _ from "lodash";

let nextId:number = 1;

const generateId = ():number =>{
    return nextId++
}

export const addItem = (item: ChartItem) => ({
    type: 'ADD_ITEM',
    payload: {...item, id: generateId()}
} as const);

export const removeItem = (id:number)=>({
    type: 'REMOVE_ITEM',
    payload: id
} as const);

export const updateItem = (item: ChartItem)=>({
    type: 'UPDATE_ITEM',
    payload: item
} as const);


export type ChartActionType = ReturnType<typeof addItem | typeof removeItem | typeof updateItem>;