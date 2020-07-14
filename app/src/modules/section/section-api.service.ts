import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IListRequest } from '@core/models/IListRequest';
import { IListResponse } from '@core/models/IListResponse';
import { ISection } from './models/ISection';
import { BaseService } from '@core/base/base.service';
import { NotificationService } from '@core/services/notification.service';
import { ServiceList } from '@core/services/ServiceList';

@Injectable({ providedIn: 'root' })
export class SectionApiService extends BaseService {
    constructor(
        private httpClient: HttpClient,
        protected notificationService: NotificationService,
    ) {
        super(httpClient, notificationService);
    }

    fetchAll(request: IListRequest): Observable<IListResponse<ISection>> {
        return this.get<IListResponse<ISection>>(
            [ServiceList.section],
            request,
        );
    }

    create(section: ISection): Observable<ISection> {
        return this.post<ISection>([ServiceList.section], section);
    }

    update(sectionId: number, section: ISection): Observable<ISection> {
        return this.post<ISection>(
            [ServiceList.section, sectionId.toString()],
            section,
        );
    }

    remove(sectionId: number): Observable<boolean> {
        return this.delete([ServiceList.section, sectionId.toString()]);
    }
}
