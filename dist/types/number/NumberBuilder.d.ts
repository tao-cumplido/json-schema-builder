import { SchemaBuilder } from '../../core/builder';
import DataReference from '../../references/data/DataReference';
export default class NumberBuilder extends SchemaBuilder {
    constructor();
    multipleOf(value: number | DataReference): NumberBuilder;
    maximum(value: number | DataReference): NumberBuilder;
    exclusiveMaximum(value: number | DataReference): NumberBuilder;
    minimum(value: number | DataReference): NumberBuilder;
    exclusiveMinimum(value: number | DataReference): NumberBuilder;
    max: (value: number | DataReference) => NumberBuilder;
    min: (value: number | DataReference) => NumberBuilder;
    xMax: (value: number | DataReference) => NumberBuilder;
    xMin: (value: number | DataReference) => NumberBuilder;
}
