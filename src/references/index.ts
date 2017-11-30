import DataReference from './data/DataReference';

export function rData(pointer: string): DataReference {
    return new DataReference(pointer);
}
