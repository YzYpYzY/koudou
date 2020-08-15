import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IListRequest } from '@core/models/IListRequest';
import { IListResponse } from '@core/models/IListResponse';
import { INews } from './models/INews';
import { BaseService } from '@core/base/base.service';
import { NotificationService } from '@core/notification/notification.service';
import { ServiceList } from '@core/services/ServiceList';

@Injectable({ providedIn: 'root' })
export class NewsApiService extends BaseService {
    constructor(
        httpClient: HttpClient,
        protected notificationService: NotificationService,
    ) {
        super(httpClient, notificationService);
    }

    fetchAll(request: IListRequest): Observable<IListResponse<INews>> {
        return this.get<IListResponse<INews>>([ServiceList.news], request);
    }

    create(news: INews): Observable<INews> {
        return this.post<INews>([ServiceList.news], news);
    }

    update(newsId: number, news: INews): Observable<INews> {
        return this.post<INews>([ServiceList.news, newsId.toString()], news);
    }

    remove(newsId: number): Observable<boolean> {
        return this.delete([ServiceList.news, newsId.toString()]);
    }
}
