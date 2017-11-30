import { SchemaBuilder } from '../../core/builder';
import { Schema } from '../../core/builder/schema';
import ArrayBuilder from './ArrayBuilder';
export default class TupleBuilder extends ArrayBuilder {
    constructor(items: Array<Schema | SchemaBuilder>);
    items(items: Array<Schema | SchemaBuilder>): TupleBuilder;
    additionalItems(value: Schema | SchemaBuilder): TupleBuilder;
}
