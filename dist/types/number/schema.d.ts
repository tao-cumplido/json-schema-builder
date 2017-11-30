import { SchemaTree } from '../../core/builder/schema';
import { ReferenceData } from '../../references/data/schema';
export interface SchemaNumber extends SchemaTree {
    type: 'number' | 'integer';
    multipleOf?: number | ReferenceData;
    maximum?: number | ReferenceData;
    exclusiveMaximum?: number | boolean | ReferenceData;
    minimum?: number | ReferenceData;
    exclusiveMinimum?: number | boolean | ReferenceData;
}
