import { BuilderOptions } from '../..';
import { SchemaTree } from '../builder/schema';
export declare function regX(regex: string): string;
export interface SerializerOptions extends BuilderOptions {
    errors: Array<Error>;
}
export declare type Serializer = (options: SerializerOptions) => void;
export declare type SerializableTree<T extends SchemaTree> = {
    [P in keyof T]: T[P] | Serializable;
};
export declare class Serializable {
    static readonly serializer: symbol;
    static readonly data: symbol;
    private isSerialized;
    constructor(serializer?: Serializer);
}
