import { SchemaBuilder } from '../../core/builder';
import { Schema, SchemaTree } from '../../core/builder/schema';

export interface SchemaNot extends SchemaTree {
    allNot: Schema | SchemaBuilder
}
