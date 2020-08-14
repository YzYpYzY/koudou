import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IListRequest } from '@core/models/IListRequest';
import { IListResponse } from '@core/models/IListResponse';
import { IPayment } from './models/IPayment';
import { BaseService } from '@core/base/base.service';
import { NotificationService } from '@core/services/notification.service';
import { ServiceList } from '@core/services/ServiceList';

@Injectable({ providedIn: 'root' })
export class PaymentApiService extends BaseService {
    constructor(
        httpClient: HttpClient,
        protected notificationService: NotificationService,
    ) {
        super(httpClient, notificationService);
    }

    fetchAll(request: IListRequest): Observable<IListResponse<IPayment>> {
        return this.get<IListResponse<IPayment>>(
            [ServiceList.payment],
            request,
        );
    }

    create(payment: IPayment): Observable<IPayment> {
        return this.post<IPayment>([ServiceList.payment], payment);
    }

    update(paymentId: number, payment: IPayment): Observable<IPayment> {
        return this.post<IPayment>(
            [ServiceList.payment, paymentId.toString()],
            payment,
        );
    }

    remove(paymentId: number): Observable<boolean> {
        return this.delete([ServiceList.payment, paymentId.toString()]);
    }
}
