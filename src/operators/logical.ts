import { SchemaBuilder } from '../core/builder';
import { Schema } from '../core/builder/schema';
import AllBuilder from './allof/AllBuilder';
import AnyBuilder from './anyof/AnyBuilder';
import MergeBuilder from './merge/MergeBuilder';
import NotBuilder from './not/NotBuilder';
import OneBuilder from './oneof/OneBuilder';

export function sAnd(...schemas: Array<Schema | SchemaBuilder>) {
    return new AllBuilder(...schemas);
}

export function sOr(...schemas: Array<Schema | SchemaBuilder>) {
    return new AnyBuilder(...schemas);
}

export function sUnion(...schemas: Array<Schema | SchemaBuilder>) {
    return new MergeBuilder(...schemas);
}

export function sNot(schema: Schema | SchemaBuilder) {
    return new NotBuilder(schema);
}

export function sXor(...schemas: Array<Schema | SchemaBuilder>) {
    return new OneBuilder(...schemas);
}
