import DataReference from '../../references/data/DataReference';
import { ReferenceData } from '../../references/data/schema';
import { Serializable, SerializerOptions } from './index';

export class VersionError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class DataReferenceError extends Error {
    constructor() {
        super(`Usage of keyword "$data" is disabled.`);
    }

    validate(value: DataReference, options: SerializerOptions): ReferenceData {
        if (options.allowDataReference) {
            value[Serializable.serializer](options);
            return value[Serializable.data];
        }

        options.errors.push(this);
        return undefined;
    }
}

export abstract class ValueError extends Error {
    constructor(keyword: string, type: string) {
        super(`The value of "${keyword}" MUST be ${type}.`);
    }
}

export class ValueIntError extends ValueError {
    static test(value: number) {
        return Number.isInteger(value) && value >= 0;
    }

    constructor(keyword: string) {
        super(keyword, 'a non-negative integer');
    }

    validate(value: number, options: SerializerOptions): number {
        if (Number.isInteger(value) && value >= 0) {
            return value;
        }

        options.errors.push(this);
        return undefined;
    }
}
