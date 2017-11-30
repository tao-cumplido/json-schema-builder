import { SchemaVersion } from '../..';
import { Serializable, SerializableTree, Serializer } from '../internal';
import { VersionError } from '../internal/errors';
import { SchemaTree } from './schema';

export interface JsonObject {
    [key: string]: JsonValue
}

export interface JsonArray extends Array<JsonValue> {}

export type JsonValue = null | string | number | boolean | JsonArray | JsonObject;

export abstract class SchemaBuilder extends Serializable {

    constructor(serializer?: Serializer) {
        super(serializer);
    }

    // omit return type for subclasses to automatically infer own type, kinda like an implicit generic
    id(value: string) {
        const data: SerializableTree<SchemaTree> = this[Serializable.data];

        data.$id = new Serializable((options) => {
            switch (options.version) {
                case SchemaVersion.DRAFT_4:
                    data.$id = undefined;
                    data.id = value;
                    break;
                default:
                    data.$id = value;
            }
        });

        return this;
    }

    comment(value: string) {
        const versionError = new VersionError(`The "$comment" keyword is supported in draft 7 or higher!`);

        const data: SerializableTree<SchemaTree> = this[Serializable.data];

        data.$comment = new Serializable((options) => {
            switch (options.version) {
                case SchemaVersion.DRAFT_4:
                case SchemaVersion.DRAFT_6:
                    options.errors.push(versionError);
                    data.$comment = undefined;
                    break;
                default:
                    data.$comment = value;
            }
        });

        return this;
    }

    description(value: string) {
        const data: SerializableTree<SchemaTree> = this[Serializable.data];

        data.description = new Serializable((options) => {
            switch (options.version) {
                default:
                    data.description = value;
            }
        });

        return this;
    }

    title(value: string) {
        const data: SerializableTree<SchemaTree> = this[Serializable.data];

        data.title = new Serializable((options) => {
            switch (options.version) {
                default:
                    data.title = value;
            }
        });

        return this;
    }

    raw(value: JsonObject) {
        // TODO: warn if properties are overridden
        Object.assign(this[Serializable.data], value);
    }
}
