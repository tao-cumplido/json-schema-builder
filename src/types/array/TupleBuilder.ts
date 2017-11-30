import { SchemaBuilder } from '../../core/builder';
import { Schema } from '../../core/builder/schema';
import { Serializable, SerializableTree } from '../../core/internal';
import ArrayBuilder from './ArrayBuilder';
import { SchemaArray } from './schema';

export default class TupleBuilder extends ArrayBuilder {
    constructor(items: Array<Schema | SchemaBuilder>) {
        super();

        if (items.length) {
            this.items(items);
        }
    }

    items(items: Array<Schema | SchemaBuilder>): TupleBuilder {
        const data: SerializableTree<SchemaArray> = this[Serializable.data];

        data.items = new Serializable((options) => {
            switch (options.version) {
                default:
                    items.forEach((item, index) => {
                        if (item instanceof SchemaBuilder) {
                            item[Serializable.serializer](options);
                            items[index] = item[Serializable.data];
                        }
                    });
                    data.items = items;
            }
        });

        return this;
    }

    additionalItems(value: Schema | SchemaBuilder): TupleBuilder {
        const data: SerializableTree<SchemaArray> = this[Serializable.data];

        data.additionalItems = new Serializable((options) => {
            switch (options.version) {
                default:
                    if (value instanceof SchemaBuilder) {
                        value[Serializable.serializer](options);
                        value = value[Serializable.data];
                    }
                    data.additionalItems = value;
            }
        });

        return this;
    }
}
