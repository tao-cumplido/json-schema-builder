import { SchemaBuilder } from '../../core/builder';
import { Schema } from '../../core/builder/schema';
import ArrayBuilder from './ArrayBuilder';
export default class ListBuilder extends ArrayBuilder {
    constructor(items?: Schema | SchemaBuilder);
    items(items: Schema | SchemaBuilder): ListBuilder;
}
