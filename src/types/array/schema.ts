import { SchemaBuilder } from '../../core/builder';
import { Schema, SchemaTree } from '../../core/builder/schema';
import { ReferenceData } from '../../references/data/schema';

export interface SchemaArray extends SchemaTree {
    type: 'array',
    items?: Schema | SchemaBuilder | Array<Schema | SchemaBuilder>,
    additionalItems?: Schema | SchemaBuilder,
    maxItems?: number | ReferenceData,
    minItems?: number | ReferenceData,
    uniqueItems?: boolean | ReferenceData,
    contains?: Schema | SchemaBuilder
}
