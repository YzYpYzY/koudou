import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IListRequest } from '@core/models/IListRequest';
import { IListResponse } from '@core/models/IListResponse';
import { IActivity } from './models/IActivity';
import { BaseService } from '@core/base/base.service';
import { NotificationService } from '@core/services/notification.service';
import { ServiceList } from '@core/services/ServiceList';
import { IFullActivity } from './models/IFullActivity';

@Injectable({ providedIn: 'root' })
export class ActivityApiService extends BaseService {
    constructor(
        httpClient: HttpClient,
        protected notificationService: NotificationService,
    ) {
        super(httpClient, notificationService);
    }

    fetchAll(request: IListRequest): Observable<IListResponse<IActivity>> {
        return this.get<IListResponse<IActivity>>(
            [ServiceList.activity],
            request,
        );
    }

    fetchOne(activityId: number) {
        return this.get<IFullActivity>([ServiceList.activity], { activityId });
    }

    create(activity: IFullActivity): Observable<IFullActivity> {
        return this.post<IFullActivity>([ServiceList.activity], activity);
    }

    update(
        activityId: number,
        activity: IFullActivity,
    ): Observable<IFullActivity> {
        return this.post<IFullActivity>(
            [ServiceList.activity, activityId.toString()],
            activity,
        );
    }

    remove(activityId: number): Observable<boolean> {
        return this.delete([ServiceList.activity, activityId.toString()]);
    }
}
