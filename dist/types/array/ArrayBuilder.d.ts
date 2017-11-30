import { SchemaBuilder } from '../../core/builder';
import { Schema } from '../../core/builder/schema';
import DataReference from '../../references/data/DataReference';
export default abstract class ArrayBuilder extends SchemaBuilder {
    constructor();
    maxItems(value: number | DataReference): this;
    minItems(value: number | DataReference): this;
    uniqueItems(value: boolean | DataReference): this;
    contains(value: Schema | SchemaBuilder): this;
    max: (value: number | DataReference) => this;
    min: (value: number | DataReference) => this;
    unique: (value: boolean | DataReference) => this;
}
