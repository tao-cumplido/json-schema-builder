import { SchemaBuilder } from '../core/builder';
import { Schema } from '../core/builder/schema';
import AllBuilder from './allof/AllBuilder';
import AnyBuilder from './anyof/AnyBuilder';
import MergeBuilder from './merge/MergeBuilder';
import NotBuilder from './not/NotBuilder';
import OneBuilder from './oneof/OneBuilder';

export function sAllOf(...schemas: Array<Schema | SchemaBuilder>) {
    return new AllBuilder(...schemas);
}

export function sAnyOf(...schemas: Array<Schema | SchemaBuilder>) {
    return new AnyBuilder(...schemas);
}

export function sMerge(...schemas: Array<Schema | SchemaBuilder>) {
    return new MergeBuilder(...schemas);
}

export function sNot(schema: Schema | SchemaBuilder) {
    return new NotBuilder(schema);
}

export function sOneOf(...schemas: Array<Schema | SchemaBuilder>) {
    return new OneBuilder(...schemas);
}
