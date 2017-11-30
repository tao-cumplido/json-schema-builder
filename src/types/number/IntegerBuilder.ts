import { Serializable } from '../../core/internal/index';
import NumberBuilder from './NumberBuilder';

export default class IntegerBuilder extends NumberBuilder {
    constructor() {
        super();
        this[Serializable.data] = { type: 'integer' };
    }
}
