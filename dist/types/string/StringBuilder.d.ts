import { SchemaBuilder } from '../../core/builder';
import DataReference from '../../references/data/DataReference';
export default class StringBuilder extends SchemaBuilder {
    constructor();
    maxLength(value: number | DataReference): this;
    minLength(value: number | DataReference): this;
    pattern(value: RegExp | DataReference): this;
}
