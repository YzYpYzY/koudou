import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IListRequest } from '@core/models/IListRequest';
import { IListResponse } from '@core/models/IListResponse';
import { INewsletterSubscriber } from './models/INewsletterSubscriber';
import { BaseService } from '@core/base/base.service';
import { NotificationService } from '@core/services/notification.service';
import { ServiceList } from '@core/services/ServiceList';

@Injectable({ providedIn: 'root' })
export class NewsletterSubscriberApiService extends BaseService {
    constructor(
        private httpClient: HttpClient,
        protected notificationService: NotificationService,
    ) {
        super(httpClient, notificationService);
    }

    fetchAll(
        request: IListRequest,
    ): Observable<IListResponse<INewsletterSubscriber>> {
        return this.get<IListResponse<INewsletterSubscriber>>(
            [ServiceList.newsletterSubscriber],
            request,
        );
    }

    create(
        newsletterSubscriber: INewsletterSubscriber,
    ): Observable<INewsletterSubscriber> {
        return this.post<INewsletterSubscriber>(
            [ServiceList.newsletterSubscriber],
            newsletterSubscriber,
        );
    }

    update(
        newsletterSubscriberId: number,
        newsletterSubscriber: INewsletterSubscriber,
    ): Observable<INewsletterSubscriber> {
        return this.post<INewsletterSubscriber>(
            [
                ServiceList.newsletterSubscriber,
                newsletterSubscriberId.toString(),
            ],
            newsletterSubscriber,
        );
    }

    remove(newsletterSubscriberId: number): Observable<boolean> {
        return this.delete([
            ServiceList.newsletterSubscriber,
            newsletterSubscriberId.toString(),
        ]);
    }
}
