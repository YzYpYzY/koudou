import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IListRequest } from '@core/models/IListRequest';
import { IListResponse } from '@core/models/IListResponse';
import { NewsletterSubscriber } from './models/INewsletterSubscriber';
import { BaseService } from '@core/base/base.service';
import { NotificationService } from '@core/notification/notification.service';
import { ServiceList } from '@core/services/ServiceList';

@Injectable({ providedIn: 'root' })
export class NewsletterSubscriberApiService extends BaseService {
    constructor(
        httpClient: HttpClient,
        protected notificationService: NotificationService,
    ) {
        super(httpClient, notificationService);
    }

    fetchAll(
        request: IListRequest,
    ): Observable<IListResponse<NewsletterSubscriber>> {
        return this.get<IListResponse<NewsletterSubscriber>>(
            [ServiceList.newsletterSubscriber],
            request,
        );
    }

    create(
        newsletterSubscriber: NewsletterSubscriber,
    ): Observable<NewsletterSubscriber> {
        return this.post<NewsletterSubscriber>(
            [ServiceList.newsletterSubscriber],
            newsletterSubscriber,
        );
    }

    update(
        newsletterSubscriberId: number,
        newsletterSubscriber: NewsletterSubscriber,
    ): Observable<NewsletterSubscriber> {
        return this.put<NewsletterSubscriber>(
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
