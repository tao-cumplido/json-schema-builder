import { SchemaBuilder } from '../../core/builder';
import { Schema } from '../../core/builder/schema';
import DataReference from '../../references/data/DataReference';
import { Properties } from './schema';
export default class ObjectBuilder extends SchemaBuilder {
    constructor(properties?: Properties);
    private requireHelper();
    maxProperties(value: number | DataReference): ObjectBuilder;
    minProperties(value: number | DataReference): ObjectBuilder;
    required(data: DataReference): ObjectBuilder;
    required(...properties: Array<string>): ObjectBuilder;
    properties(properties: Properties): ObjectBuilder;
    patternProperties(properties: Properties): ObjectBuilder;
    additionalProperties(value: Schema | SchemaBuilder | DataReference): ObjectBuilder;
    propertyNames(value: Schema | SchemaBuilder): ObjectBuilder;
    max: (value: number | DataReference) => ObjectBuilder;
    min: (value: number | DataReference) => ObjectBuilder;
    require: {
        (data: DataReference): ObjectBuilder;
        (...properties: string[]): ObjectBuilder;
    } & {
        all: () => ObjectBuilder;
        but: (...properties: string[]) => ObjectBuilder;
    };
    patterns: (properties: Properties) => ObjectBuilder;
    restrict(value?: boolean): ObjectBuilder;
}
