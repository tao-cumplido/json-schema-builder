import { SchemaBuilder } from '../../core/builder';
import { Schema, SchemaTree } from '../../core/builder/schema';

export interface SchemaOne extends SchemaTree {
    oneOf: Array<Schema | SchemaBuilder>
}
