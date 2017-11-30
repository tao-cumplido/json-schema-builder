import { SchemaBuilder } from '../../core/builder';
import { Schema, SchemaTree } from '../../core/builder/schema';
import { ReferenceData } from '../../references/data/schema';

export interface Properties {
    [key: string]: Schema | SchemaBuilder
}

export interface Dependencies {
    [key: string]: Array<string> | Schema | SchemaBuilder
}

export interface SchemaObject extends SchemaTree {
    type: 'object',
    maxProperties?: number | ReferenceData,
    minProperties?: number | ReferenceData,
    required?: Array<string> | ReferenceData,
    properties?: Properties,
    patternProperties?: Properties,
    additionalProperties?: Schema | SchemaBuilder | ReferenceData,
    dependencies?: Dependencies,
    propertyNames?: Schema | SchemaBuilder
}
