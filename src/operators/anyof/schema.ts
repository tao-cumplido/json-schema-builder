import { SchemaBuilder } from '../../core/builder';
import { Schema, SchemaTree } from '../../core/builder/schema';

export interface SchemaAny extends SchemaTree {
    anyOf: Array<Schema | SchemaBuilder>
}
