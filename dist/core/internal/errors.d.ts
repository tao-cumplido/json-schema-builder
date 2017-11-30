import DataReference from '../../references/data/DataReference';
import { ReferenceData } from '../../references/data/schema';
import { SerializerOptions } from './index';
export declare class VersionError extends Error {
    constructor(message: string);
}
export declare class DataReferenceError extends Error {
    constructor();
    validate(value: DataReference, options: SerializerOptions): ReferenceData;
}
export declare abstract class ValueError extends Error {
    constructor(keyword: string, type: string);
}
export declare class ValueIntError extends ValueError {
    static test(value: number): boolean;
    constructor(keyword: string);
    validate(value: number, options: SerializerOptions): number;
}
