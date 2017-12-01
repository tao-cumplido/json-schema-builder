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
export declare function sObject(properties?: Properties): ObjectBuilder;
export declare function sList(items?: Schema | SchemaBuilder): ListBuilder;
export declare const sArray: typeof sList;
export declare function sTuple(items: Array<Schema | SchemaBuilder>): TupleBuilder;
export declare function sString(): StringBuilder;
export declare function sNumber(): NumberBuilder;
export declare function sInteger(): IntegerBuilder;
export declare function sBoolean(): BooleanBuilder;
export declare function sNull(): NullBuilder;
export declare function sEnum(...items: Array<JsonValue>): EnumBuilder;
export declare function sConst(value: JsonValue): ConstBuilder;
