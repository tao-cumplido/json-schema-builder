import { SchemaVersion } from '../..';
import { SchemaBuilder } from '../../core/builder';
import { Schema } from '../../core/builder/schema';
import { Serializable, SerializableTree } from '../../core/internal';
import { DataReferenceError, ValueIntError, VersionError } from '../../core/internal/errors';
import DataReference from '../../references/data/DataReference';
import { SchemaArray } from './schema';

export default abstract class ArrayBuilder extends SchemaBuilder {
    constructor() {
        super(function (this: ArrayBuilder, options) {
            Object.values(this[Serializable.data]).filter((item) => item instanceof Serializable).forEach((serializable) => {
                serializable[Serializable.serializer](options);
            });
        });

        this[Serializable.data] = { type: 'array' };
    }

    maxItems(value: number | DataReference) {
        const valueError = new ValueIntError('maxItems');
        const dataRefError = new DataReferenceError();

        const data: SerializableTree<SchemaArray> = this[Serializable.data];

        data.maxItems = new Serializable((options) => {
            const max = value instanceof DataReference ? dataRefError.validate(value, options) : valueError.validate(value, options);
            switch (options.version) {
                default:
                    data.maxItems = max;
            }
        });

        return this;
    }

    minItems(value: number | DataReference) {
        const valueError = new ValueIntError('minItems');
        const dataRefError = new DataReferenceError();

        const data: SerializableTree<SchemaArray> = this[Serializable.data];

        data.minItems = new Serializable((options) => {
            const min = value instanceof DataReference ? dataRefError.validate(value, options) : valueError.validate(value, options);
            switch (options.version) {
                default:
                    data.minItems = min;
            }
        });

        return this;
    }

    uniqueItems(value: boolean | DataReference) {
        const dataRefError = new DataReferenceError();

        const data: SerializableTree<SchemaArray> = this[Serializable.data];

        data.uniqueItems = new Serializable((options) => {
            const unique = value instanceof DataReference ? dataRefError.validate(value, options) : value;
            switch (options.version) {
                default:
                    data.uniqueItems = unique;
            }
        });

        return this;
    }

    contains(value: Schema | SchemaBuilder) {
        const versionError = new VersionError(`The property "contains" is not available for this version of JSON Schema.`);

        const data: SerializableTree<SchemaArray> = this[Serializable.data];

        data.contains = new Serializable((options) => {
            switch (options.version) {
                case SchemaVersion.DRAFT_4:
                    options.errors.push(versionError);
                    data.contains = undefined;
                    break;
                default:
                    if (value instanceof SchemaBuilder) {
                        value[Serializable.serializer](options);
                        value = value[Serializable.data];
                    }
                    data.contains = value;
            }
        });

        return this;
    }

    /* tslint:disable:member-ordering */

    // shortcuts
    max = this.maxItems;
    min = this.minItems;
    unique = this.uniqueItems;
}
