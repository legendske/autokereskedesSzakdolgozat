import { Models } from "../models/models";

export function toObject<TValues,TReturn = TValues>(array: ReadonlyArray<TValues>,
    keySelector: (value: TValues) => string,
    valueSelector?: (value: TValues) => TReturn): Record<string, TReturn> {
    return array.reduce((obj: Record<string, TReturn>, value) => {
        const key = keySelector.call(undefined, value);
        const mappedValue = valueSelector === undefined ? value : valueSelector.call(undefined, value);
        obj[key] = mappedValue as TReturn;
        return obj;
    }, {});
}

export function toSelectOptions(data: Models.IData[]): ISelectOption<string>[]{
    return data.map(p => ({
        id: p.id,
        value: p.name,
    }) as ISelectOption<string>);
}

export interface ISelectOption<T> {
    id: T;
    value: string;
}