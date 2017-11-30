import { SchemaBuilder } from '../../core/builder';
import { Serializable, SerializableTree } from '../../core/internal';
import { DataReferenceError, ValueIntError } from '../../core/internal/errors';
import DataReference from '../../references/data/DataReference';
import { SchemaString } from './schema';

export default class StringBuilder extends SchemaBuilder {
    constructor() {
        super(function (this: StringBuilder, options) {
            Object.values(this[Serializable.data]).filter((item) => item instanceof Serializable).forEach((serializable) => {
                serializable[Serializable.serializer](options);
            });
        });

        this[Serializable.data] = { type: 'string' };
    }

    maxLength(value: number | DataReference) {
        const valueError = new ValueIntError('maxItems');
        const dataRefError = new DataReferenceError();

        const data: SerializableTree<SchemaString> = this[Serializable.data];

        data.maxLength = new Serializable((options) => {
            const max = value instanceof DataReference ? dataRefError.validate(value, options) : valueError.validate(value, options);
            switch (options.version) {
                default:
                    data.maxLength = max;
            }
        });

        return this;
    }

    minLength(value: number | DataReference) {
        const valueError = new ValueIntError('maxItems');
        const dataRefError = new DataReferenceError();

        const data: SerializableTree<SchemaString> = this[Serializable.data];

        data.minLength = new Serializable((options) => {
            const max = value instanceof DataReference ? dataRefError.validate(value, options) : valueError.validate(value, options);
            switch (options.version) {
                default:
                    data.minLength = max;
            }
        });

        return this;
    }

    pattern(value: RegExp | DataReference) {
        const dataRefError = new DataReferenceError();

        const data: SerializableTree<SchemaString> = this[Serializable.data];

        data.pattern = new Serializable((options) => {
            const pattern = value instanceof DataReference ? dataRefError.validate(value, options) : value.source;
            switch (options.version) {
                default:
                    data.pattern = pattern;
            }
        });

        return this;
    }
}
