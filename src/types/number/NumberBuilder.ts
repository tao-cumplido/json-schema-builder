import { SchemaVersion } from '../..';
import { SchemaBuilder } from '../../core/builder';
import { Serializable, SerializableTree } from '../../core/internal';
import { DataReferenceError, ValueIntError } from '../../core/internal/errors';
import DataReference from '../../references/data/DataReference';
import { SchemaNumber } from './schema';

export default class NumberBuilder extends SchemaBuilder {
    constructor() {
        super(function (this: NumberBuilder, options) {
            Object.values(this[Serializable.data]).filter((item) => item instanceof Serializable).forEach((serializable) => {
                serializable[Serializable.serializer](options);
            });
        });

        this[Serializable.data] = { type: 'number' };
    }

    multipleOf(value: number | DataReference): NumberBuilder {
        const valueError = new ValueIntError('multipleOf');
        const dataRefError = new DataReferenceError();

        const data: SerializableTree<SchemaNumber> = this[Serializable.data];

        data.multipleOf = new Serializable((options) => {
            const multiple = value instanceof DataReference ? dataRefError.validate(value, options) : valueError.validate(value, options);
            switch (options.version) {
                default:
                    data.multipleOf = multiple;
            }
        });

        return this;
    }

    maximum(value: number | DataReference): NumberBuilder {
        const valueError = new ValueIntError('maximum');
        const dataRefError = new DataReferenceError();

        const data: SerializableTree<SchemaNumber> = this[Serializable.data];

        data.maximum = new Serializable((options) => {
            const max = value instanceof DataReference ? dataRefError.validate(value, options) : valueError.validate(value, options);
            switch (options.version) {
                default:
                    data.maximum = max;
            }
        });

        return this;
    }

    exclusiveMaximum(value: number | DataReference): NumberBuilder {
        const valueError = new ValueIntError('exclusiveMaximum');
        const dataRefError = new DataReferenceError();

        const data: SerializableTree<SchemaNumber> = this[Serializable.data];

        data.exclusiveMaximum = new Serializable((options) => {
            const max = value instanceof DataReference ? dataRefError.validate(value, options) : valueError.validate(value, options);
            switch (options.version) {
                case SchemaVersion.DRAFT_4:
                    data.maximum = max;
                    data.exclusiveMaximum = max === undefined ? max : true;
                    break;
                default:
                    data.exclusiveMaximum = max;
            }
        });

        return this;
    }

    minimum(value: number | DataReference): NumberBuilder {
        const valueError = new ValueIntError('minimum');
        const dataRefError = new DataReferenceError();

        const data: SerializableTree<SchemaNumber> = this[Serializable.data];

        data.minimum = new Serializable((options) => {
            const min = value instanceof DataReference ? dataRefError.validate(value, options) : valueError.validate(value, options);
            switch (options.version) {
                default:
                    data.minimum = min;
            }
        });

        return this;
    }

    exclusiveMinimum(value: number | DataReference): NumberBuilder {
        const valueError = new ValueIntError('exclusiveMinimum');
        const dataRefError = new DataReferenceError();

        const data: SerializableTree<SchemaNumber> = this[Serializable.data];

        data.exclusiveMinimum = new Serializable((options) => {
            const min = value instanceof DataReference ? dataRefError.validate(value, options) : valueError.validate(value, options);
            switch (options.version) {
                case SchemaVersion.DRAFT_4:
                    data.minimum = min;
                    data.exclusiveMinimum = min === undefined ? min : true;
                    break;
                default:
                    data.exclusiveMinimum = min;
            }
        });

        return this;
    }

    /* tslint:disable:member-ordering */

    // shortcuts
    max = this.maximum;
    min = this.minimum;
    xMax = this.exclusiveMaximum;
    xMin = this.exclusiveMinimum;
}
