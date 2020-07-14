import { CrudStates } from '@core/enums';
import { IPayment } from './../models/IPayment';
import { IListRequest } from '@core/models/IListRequest';

export interface PaymentState {
    payments: IPayment[];
    paymentsCount: number;
    selectedPaymentId: number;
    selectedPayment: IPayment;
    request: IListRequest;
    error: any;
    viewState: CrudStates;
    isPaymentLoading: boolean;
}

export const PaymentStateDefault = {
    payments: null,
    paymentsCount: 0,
    selectedPaymentId: null,
    selectedPayment: null,
    request: null,
    error: null,
    viewState: CrudStates.List,
    isPaymentLoading: false,
};
