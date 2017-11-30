import { cloneDeep, isArray, mergeWith } from 'lodash';
import { SchemaBuilder } from '../../core/builder';
import { Schema } from '../../core/builder/schema';
import { Serializable } from '../../core/internal';

export default class MergeBuilder extends SchemaBuilder {
    constructor(...schemas: Array<Schema | SchemaBuilder>) {
        super(function (this: SchemaBuilder, options) {
            schemas.forEach((schema, i) => {
                if (schema instanceof SchemaBuilder) {
                    schema[Serializable.serializer](options);
                    schemas[i] = schema[Serializable.data];
                }
            });

            mergeWith(this[Serializable.data], ...schemas.map(cloneDeep), (targetValue, sourceValue) => {
                if (isArray(targetValue)) return targetValue.concat(sourceValue);
            });
        });

        this[Serializable.data] = {};
    }
}
