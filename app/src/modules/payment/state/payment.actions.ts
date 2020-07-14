import { IPayment } from './../models/IPayment';
import { CrudStates } from '@core/enums';
import { IListRequest } from '@core/models/IListRequest';

export namespace PaymentActions {
    export class FetchAll {
        static readonly type = '[PaymentList] Fetch all payments';
        constructor(public request: IListRequest) {}
    }
    export class Select {
        static readonly type = '[PaymentList] Select payment';
        constructor(public paymentId: number) {}
    }
    export class Save {
        static readonly type = '[PaymentForm] Save payment';
        constructor(public payment: IPayment) {}
    }
    export class Delete {
        static readonly type = '[PaymentForm] Delete payment';
        constructor(public paymentId: number) {}
    }

    export class SetViewState {
        static readonly type = '[Payment] Set view state';
        constructor(public newState: CrudStates) {}
    }
}
