import { SchemaBuilder } from '../../core/builder';
import { Schema } from '../../core/builder/schema';
import { Serializable } from '../../core/internal';

export default class AllBuilder extends SchemaBuilder {
    constructor(...schemas: Array<Schema | SchemaBuilder>) {
        super(function (this: SchemaBuilder, options) {
            schemas.forEach((schema, i) => {
                if (schema instanceof SchemaBuilder) {
                    schema[Serializable.serializer](options);
                    schemas[i] = schema[Serializable.data];
                }
            });

            this[Serializable.data].allOf = schemas;
        });

        this[Serializable.data] = {};
    }
}
