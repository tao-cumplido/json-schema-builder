import { WriteOptions } from 'fs-extra';
import { SchemaBuilder } from './core/builder';
import { Schema } from './core/builder/schema';
import { Serializable } from './core/internal';
export declare enum SchemaVersion {
    DRAFT_4 = "http://json-schema.org/draft-04/schema#",
    DRAFT_6 = "http://json-schema.org/draft-06/schema#",
    DRAFT_7 = "http://json-schema.org/draft-07/schema#",
}
export interface BuilderOptions {
    version: SchemaVersion;
    allowDataReference: boolean;
}
export declare class JsonSchema extends Serializable {
    private options;
    private errorMessages;
    constructor(version: SchemaVersion, schema: Schema | SchemaBuilder);
    constructor(options: BuilderOptions, schema: Schema | SchemaBuilder);
    readonly errors: Array<string>;
    write(path: string, options?: WriteOptions): void;
}
