import { SchemaBuilder } from '../../core/builder';
import { Schema } from '../../core/builder/schema';
export default class MergeBuilder extends SchemaBuilder {
    constructor(...schemas: Array<Schema | SchemaBuilder>);
}
