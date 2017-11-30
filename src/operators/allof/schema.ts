import { SchemaBuilder } from '../../core/builder';
import { Schema, SchemaTree } from '../../core/builder/schema';

export interface SchemaAll extends SchemaTree {
    allOf: Array<Schema | SchemaBuilder>
}
