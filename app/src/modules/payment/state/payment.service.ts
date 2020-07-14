import { CrudStates } from '@core/enums';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IListRequest } from '@core/models/IListRequest';
import { Store, Select } from '@ngxs/store';
import { PaymentActions } from './payment.actions';
import { PaymentStore } from './payment.store';
import { IPayment } from '../models/IPayment';

@Injectable({ providedIn: 'root' })
export class PaymentService {
    @Select(PaymentStore.payments$)
    payments$: Observable<IPayment[]>;
    @Select(PaymentStore.paymentsCount$)
    paymentsCount$: Observable<number>;
    @Select(PaymentStore.selectedPayment$)
    selectedPayment$: Observable<IPayment>;
    @Select(PaymentStore.error$)
    error$: Observable<string>;
    @Select(PaymentStore.state$)
    state$: Observable<CrudStates>;

    constructor(private store: Store) {}

    fetchAll(request: IListRequest): void {
        this.store.dispatch(new PaymentActions.FetchAll(request));
    }

    select(paymentId: number): void {
        this.store.dispatch(new PaymentActions.Select(paymentId));
    }

    save(payment: IPayment): void {
        this.store.dispatch(new PaymentActions.Save(payment));
    }
    delete(paymentId: number) {
        this.store.dispatch(new PaymentActions.Delete(paymentId));
    }

    setState(newState: CrudStates) {
        this.store.dispatch(new PaymentActions.SetViewState(newState));
    }
}
