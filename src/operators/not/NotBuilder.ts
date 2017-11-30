import { SchemaBuilder } from '../../core/builder';
import { Schema } from '../../core/builder/schema';
import { Serializable } from '../../core/internal';

export default class NotBuilder extends SchemaBuilder {
    constructor(schema: Schema | SchemaBuilder) {
        super(function (this: SchemaBuilder, options) {
            if (schema instanceof SchemaBuilder) {
                schema[Serializable.serializer](options);
                this[Serializable.data].not = schema[Serializable.data];
            } else {
                this[Serializable.data].not = schema;
            }
        });

        this[Serializable.data] = {};
    }
}
