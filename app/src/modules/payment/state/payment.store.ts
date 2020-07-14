import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { tap, catchError, mergeMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { PaymentState, PaymentStateDefault } from './payment.state';
import { PaymentApiService } from '../payment-api.service';
import { PaymentActions } from './payment.actions';
import { IPayment } from '../models/IPayment';
import { IListResponse } from '@core/models/IListResponse';

@Injectable()
@State<PaymentState>({
    name: 'payment',
    defaults: PaymentStateDefault,
})
export class PaymentStore {
    @Selector()
    static payments$(state: PaymentState) {
        return state.payments;
    }
    @Selector()
    static paymentsCount$(state: PaymentState) {
        return state.paymentsCount;
    }
    @Selector()
    static selectedPayment$(state: PaymentState) {
        return state.selectedPayment;
    }
    @Selector()
    static selectedPaymentId$(state: PaymentState) {
        return state.selectedPaymentId;
    }
    @Selector()
    static error$(state: PaymentState) {
        return state.error;
    }
    @Selector()
    static state$(state: PaymentState) {
        return state.viewState;
    }
    @Selector()
    static isPaymentLoading$(state: PaymentState) {
        return state.isPaymentLoading;
    }
    constructor(private paymentApiService: PaymentApiService) {}

    @Action(PaymentActions.FetchAll)
    fetchAll(
        { patchState }: StateContext<PaymentState>,
        { request }: PaymentActions.FetchAll,
    ) {
        patchState({
            isPaymentLoading: true,
        });
        return this.paymentApiService.fetchAll(request).pipe(
            tap((res: IListResponse<IPayment>) => {
                patchState({
                    payments: res.values,
                    paymentsCount: res.totalCount,
                    isPaymentLoading: false,
                });
            }),
            catchError((error: Error) => {
                patchState({
                    error: error.message,
                    isPaymentLoading: false,
                });
                return of(error);
            }),
        );
    }

    @Action(PaymentActions.Select)
    select(
        { patchState, dispatch }: StateContext<PaymentState>,
        { paymentId },
    ) {
        patchState({
            selectedPaymentId: paymentId,
            selectedPayment: null,
        });
    }

    @Action(PaymentActions.Save)
    save(
        { patchState }: StateContext<PaymentState>,
        { payment }: PaymentActions.Save,
    ) {
        patchState({
            isPaymentLoading: true,
        });
        if (payment.id) {
            return this.paymentApiService.update(payment.id, payment).pipe(
                tap((res: IPayment) => {
                    patchState({
                        selectedPaymentId: payment.id,
                        selectedPayment: res,
                        isPaymentLoading: false,
                    });
                }),
                catchError((error: Error) => {
                    patchState({
                        error: error.message,
                        isPaymentLoading: false,
                    });
                    return of(error);
                }),
            );
        } else {
            return this.paymentApiService.create(payment).pipe(
                tap((res: IPayment) => {
                    patchState({
                        selectedPaymentId: payment.id,
                        selectedPayment: res,
                        isPaymentLoading: false,
                    });
                }),
                catchError((error: Error) => {
                    patchState({
                        error: error.message,
                        isPaymentLoading: false,
                    });
                    return of(error);
                }),
            );
        }
    }

    @Action(PaymentActions.Delete)
    delete(
        { patchState }: StateContext<PaymentState>,
        { paymentId }: PaymentActions.Delete,
    ) {
        patchState({
            isPaymentLoading: true,
        });
        return this.paymentApiService.remove(paymentId).pipe(
            tap((res: boolean) => {
                patchState({
                    selectedPaymentId: null,
                    selectedPayment: null,
                    payments: null,
                    paymentsCount: null,
                    isPaymentLoading: false,
                });
            }),
            catchError((error: Error) => {
                patchState({
                    error: error.message,
                    isPaymentLoading: false,
                });
                return of(error);
            }),
        );
    }
    @Action(PaymentActions.SetViewState)
    setViewState(
        { patchState }: StateContext<PaymentState>,
        { newState }: PaymentActions.SetViewState,
    ) {
        patchState({
            viewState: newState,
        });
    }
}
