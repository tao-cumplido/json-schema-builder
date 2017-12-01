import { SchemaVersion } from '../..';
import { SchemaBuilder } from '../../core/builder';
import { Schema } from '../../core/builder/schema';
import { regX, Serializable, SerializableTree } from '../../core/internal';
import { DataReferenceError, ValueIntError, VersionError } from '../../core/internal/errors';
import DataReference from '../../references/data/DataReference';
import { Dependencies, Properties, SchemaObject } from './schema';

export default class ObjectBuilder extends SchemaBuilder {
    constructor(properties?: Properties) {
        super(function (this: ObjectBuilder, options) {
            Object.values(this[Serializable.data]).filter((item) => item instanceof Serializable).forEach((serializable) => {
                serializable[Serializable.serializer](options);
            });
        });

        this[Serializable.data] = { type: 'object' };

        if (properties) {
            this.properties(properties);
        }
    }

    private requireHelper() {
        const data: SerializableTree<SchemaObject> = this[Serializable.data];
        const required = this.required;
        return {
            all: () => required(...Object.keys(data.properties || {})),
            but: (...properties: Array<string>) => required(...Object.keys(data.properties || {}).filter((x) => !properties.includes(x)))
        }
    };

    maxProperties(value: number | DataReference): ObjectBuilder {
        const valueError = new ValueIntError('maxProperties');
        const dataRefError = new DataReferenceError();

        const data: SerializableTree<SchemaObject> = this[Serializable.data];

        data.maxProperties = new Serializable((options) => {
            const max = value instanceof DataReference ? dataRefError.validate(value, options) : valueError.validate(value, options);
            switch (options.version) {
                default:
                    data.maxProperties = max;
            }
        });

        return this;
    }

    minProperties(value: number | DataReference): ObjectBuilder {
        const valueError = new ValueIntError('minProperties');
        const dataRefError = new DataReferenceError();

        const data: SerializableTree<SchemaObject> = this[Serializable.data];

        data.minProperties = new Serializable((options) => {
            const min = value instanceof DataReference ? dataRefError.validate(value, options) : valueError.validate(value, options);
            switch (options.version) {
                default:
                    data.minProperties = min;
            }
        });

        return this;
    }

    required(data: DataReference): ObjectBuilder;
    required(...properties: Array<string>): ObjectBuilder;
    required(first: string | DataReference, ...rest: Array<string>): ObjectBuilder {
        const versionError = new VersionError(`Empty required not allowed in draft 4!`);
        const dataRefError = new DataReferenceError();

        const data: SerializableTree<SchemaObject> = this[Serializable.data];

        data.required = new Serializable((options) => {
            switch (options.version) {
                case SchemaVersion.DRAFT_4:
                    options.errors.push(versionError);
                    data.required = undefined;
                    break;
                default:
                    data.required = first instanceof DataReference ? dataRefError.validate(first, options) : [first, ...rest];
            }
        });

        return this;
    };

    properties(properties: Properties): ObjectBuilder {
        const data: SerializableTree<SchemaObject> = this[Serializable.data];

        data.properties = new Serializable((options) => {
            switch (options.version) {
                default:
                    Object.keys(properties).forEach((name) => {
                        let property = properties[name];
                        if (property instanceof SchemaBuilder) {
                            property[Serializable.serializer](options);
                            properties[name] = property[Serializable.data];
                        }
                    });

                    data.properties = properties;
            }
        });

        return this;
    }

    patternProperties(properties: Properties): ObjectBuilder {
        const data: SerializableTree<SchemaObject> = this[Serializable.data];

        data.patternProperties = new Serializable((options) => {
            switch (options.version) {
                default:
                    const serialized = {};

                    Object.keys(properties).forEach((name) => {
                        let property = properties[name];
                        if (property instanceof SchemaBuilder) {
                            property[Serializable.serializer](options);
                            property = property[Serializable.data];
                        }
                        Object.assign(serialized, {
                            [regX(name)]: property
                        });
                    });

                    data.patternProperties = serialized;
            }
        });

        return this;
    }

    additionalProperties(value: Schema | SchemaBuilder | DataReference): ObjectBuilder {
        const data: SerializableTree<SchemaObject> = this[Serializable.data];

        data.additionalProperties = new Serializable((options) => {
            switch (options.version) {
                default:
                    if (value instanceof Serializable) {
                        value[Serializable.serializer](options);
                        value = value[Serializable.data];
                    }
                    data.additionalProperties = value;
            }
        });

        return this;
    }

    /*dependencies(dependencies: Dependencies): ObjectBuilder {
        const versionError = new VersionError(`Empty dependencies array not allowed in draft 4!`);
        // TODO
        return this;
    }*/

    propertyNames(value: Schema | SchemaBuilder): ObjectBuilder {
        const versionError = new VersionError(`propertyNames are not allowed in draft 4!`);

        const data: SerializableTree<SchemaObject> = this[Serializable.data];

        data.propertyNames = new Serializable((options) => {
            switch (options.version) {
                case SchemaVersion.DRAFT_4:
                    options.errors.push(versionError);
                    data.propertyNames = undefined;
                    break;
                default:
                    if (value instanceof Serializable) {
                        value[Serializable.serializer](options);
                        value = value[Serializable.data];
                    }
                    data.propertyNames = value;
            }
        });

        return this;
    }

    /* tslint:disable:member-ordering */

    // shortcuts
    max = this.maxProperties;

    min = this.minProperties;

    require = Object.assign(this.required, this.requireHelper());

    patterns = this.patternProperties;

    restrict(value = true) {
        return this.additionalProperties(!value);
    }
}
