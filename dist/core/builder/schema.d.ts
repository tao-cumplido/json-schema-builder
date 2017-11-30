import { SchemaVersion } from '../..';
export interface SchemaTree {
    $id?: string;
    $comment?: string;
    description?: string;
    title?: string;
    id?: string;
}
export interface SchemaRoot extends SchemaTree {
    $schema: SchemaVersion;
}
export declare type Schema = SchemaTree | boolean;
