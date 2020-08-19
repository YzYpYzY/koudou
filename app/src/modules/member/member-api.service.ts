import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IListRequest } from '@core/models/IListRequest';
import { IListResponse } from '@core/models/IListResponse';
import { IMember } from './models/IMember';
import { BaseService } from '@core/base/base.service';
import { NotificationService } from '@core/notification/notification.service';
import { ServiceList } from '@core/services/ServiceList';
import { IMemberDetails } from './models/IMemberDetails';

@Injectable({ providedIn: 'root' })
export class MemberApiService extends BaseService {
    constructor(
        httpClient: HttpClient,
        protected notificationService: NotificationService,
    ) {
        super(httpClient, notificationService);
    }

    fetchAll(request: IListRequest): Observable<IListResponse<IMember>> {
        return this.get<IListResponse<IMember>>([ServiceList.member], request);
    }

    fetchOne(id: string): Observable<IMemberDetails> {
        return this.get<IMemberDetails>([ServiceList.member, id]);
    }

    create(member: IMemberDetails): Observable<IMemberDetails> {
        return this.post<IMemberDetails>([ServiceList.member], member);
    }

    update(
        memberId: number,
        member: IMemberDetails,
    ): Observable<IMemberDetails> {
        return this.put<IMemberDetails>(
            [ServiceList.member, memberId.toString()],
            member,
        );
    }

    remove(memberId: number): Observable<boolean> {
        return this.delete([ServiceList.member, memberId.toString()]);
    }
}
