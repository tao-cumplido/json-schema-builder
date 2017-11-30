import { Serializable } from '../../core/internal';
export default class DataReference extends Serializable {
    private static readonly JSON_POINTER;
    private typeError;
    constructor(pointer: string);
}
