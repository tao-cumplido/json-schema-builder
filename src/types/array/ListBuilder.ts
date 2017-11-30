import { SchemaBuilder } from '../../core/builder';
import { Schema } from '../../core/builder/schema';
import { Serializable, SerializableTree } from '../../core/internal';
import ArrayBuilder from './ArrayBuilder';
import { SchemaArray } from './schema';

export default class ListBuilder extends ArrayBuilder {
    constructor(items?: Schema | SchemaBuilder) {
        super();

        if (items) {
            this.items(items);
        }
    }

    items(items: Schema | SchemaBuilder): ListBuilder {
        const data: SerializableTree<SchemaArray> = this[Serializable.data];

        data.items = new Serializable((options) => {
            switch (options.version) {
                default:
                    if (items instanceof SchemaBuilder) {
                        items[Serializable.serializer](options);
                        items = items[Serializable.data];
                    }
                    data.items = items;
            }
        });

        return this;
    }
}
