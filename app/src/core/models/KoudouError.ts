import { ErrorTypes } from '../enums/ErrorTypes';

export class KoudouError {
    type: ErrorTypes;
    message: string;
    treated: boolean;

    constructor(message: string, type: ErrorTypes = ErrorTypes.Notification) {
        this.type = type;
        this.message = message;
        this.treated = false;
    }
}
