import * as ErrorStack from 'error-stack-parser';
import { writeJsonSync, WriteOptions } from 'fs-extra';
import { SchemaBuilder } from './core/builder';
import { Schema } from './core/builder/schema';
import { Serializable, SerializerOptions } from './core/internal';

export enum SchemaVersion {
    DRAFT_4 = 'http://json-schema.org/draft-04/schema#',
    DRAFT_6 = 'http://json-schema.org/draft-06/schema#',
    DRAFT_7 = 'http://json-schema.org/draft-07/schema#',
}

export interface BuilderOptions {
    version: SchemaVersion,
    allowDataReference: boolean
}

export class JsonSchema extends Serializable {

    private options: SerializerOptions;
    private errorMessages: Array<string>;

    constructor(version: SchemaVersion, schema: Schema | SchemaBuilder);
    constructor(options: BuilderOptions, schema: Schema | SchemaBuilder);
    constructor(versionOrOptions: SchemaVersion | BuilderOptions, schema: Schema | SchemaBuilder) {
        super(function (this: JsonSchema) {
            if (schema instanceof SchemaBuilder) {
                schema[Serializable.serializer](this.options);
                Object.assign(this[Serializable.data], schema[Serializable.data]);
            } else {
                Object.assign(this[Serializable.data], schema);
            }
        });

        this.errorMessages = [];

        this[Serializable.data] = { $schema: versionOrOptions };

        if (typeof versionOrOptions === 'string') {
            this.options = {
                version: versionOrOptions,
                allowDataReference: false,
                errors: []
            }
        } else {
            this.options = Object.assign(versionOrOptions, { errors: [] });
        }

        this[Serializable.serializer](this.options);

        this.options.errors.forEach((error) => {
            const stackFrame = ErrorStack.parse(error).find((frame) => frame.functionName === 'Object.<anonymous>');
            const name = Object.getPrototypeOf(error).constructor.name;
            const message = error.message;
            const file = stackFrame.fileName;
            const line = stackFrame.lineNumber;
            const column = stackFrame.columnNumber;
            this.errorMessages.push(`${name}: ${message}\n  at ${file}\n  line: ${line}, column: ${column}`);
        });
    }

    get errors(): Array<string> {
        return this.errorMessages;
    }

    write(path: string, options?: WriteOptions) {
        writeJsonSync(path, this[Serializable.data], options || {
            spaces: 4
        });
    }
}
