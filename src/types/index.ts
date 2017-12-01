import { JsonValue, SchemaBuilder } from '../core/builder';
import { Schema } from '../core/builder/schema';
import ListBuilder from './array/ListBuilder';
import TupleBuilder from './array/TupleBuilder';
import BooleanBuilder from './boolean/BooleanBuilder';
import ConstBuilder from './general/ConstBuilder';
import EnumBuilder from './general/EnumBuilder';
import NullBuilder from './null/NullBuilder';
import IntegerBuilder from './number/IntegerBuilder';
import NumberBuilder from './number/NumberBuilder';
import ObjectBuilder from './object/ObjectBuilder';
import { Properties } from './object/schema';
import StringBuilder from './string/StringBuilder';

export function sObject(properties?: Properties) {
    return new ObjectBuilder(properties);
}

export function sList(items?: Schema | SchemaBuilder) {
    return new ListBuilder(items);
}

export const sArray = sList;

export function sTuple(items: Array<Schema | SchemaBuilder>) {
    return new TupleBuilder(items);
}

export function sString() {
    return new StringBuilder();
}

export function sNumber() {
    return new NumberBuilder();
}

export function sInteger() {
    return new IntegerBuilder();
}

export function sBoolean() {
    return new BooleanBuilder();
}

export function sNull() {
    return new NullBuilder();
}

export function sEnum(...items: Array<JsonValue>) {
    return new EnumBuilder(...items);
}

export function sConst(value: JsonValue) {
    return new ConstBuilder(value);
}
