import { Serializable, Serializer } from '../internal';
export interface JsonObject {
    [key: string]: JsonValue;
}
export interface JsonArray extends Array<JsonValue> {
}
export declare type JsonValue = null | string | number | boolean | JsonArray | JsonObject;
export declare abstract class SchemaBuilder extends Serializable {
    constructor(serializer?: Serializer);
    id(value: string): this;
    comment(value: string): this;
    description(value: string): this;
    title(value: string): this;
    raw(value: JsonObject): void;
}
