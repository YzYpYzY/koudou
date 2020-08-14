import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IListRequest } from '@core/models/IListRequest';
import { IListResponse } from '@core/models/IListResponse';
import { IAlbum } from './models/IAlbum';
import { BaseService } from '@core/base/base.service';
import { NotificationService } from '@core/services/notification.service';
import { ServiceList } from '@core/services/ServiceList';

@Injectable({ providedIn: 'root' })
export class AlbumApiService extends BaseService {
    constructor(
        httpClient: HttpClient,
        protected notificationService: NotificationService,
    ) {
        super(httpClient, notificationService);
    }

    fetchAll(request: IListRequest): Observable<IListResponse<IAlbum>> {
        return this.get<IListResponse<IAlbum>>([ServiceList.album], request);
    }

    create(album: IAlbum): Observable<IAlbum> {
        return this.post<IAlbum>([ServiceList.album], album);
    }

    update(albumId: number, album: IAlbum): Observable<IAlbum> {
        return this.post<IAlbum>(
            [ServiceList.album, albumId.toString()],
            album,
        );
    }

    remove(albumId: number): Observable<boolean> {
        return this.delete([ServiceList.album, albumId.toString()]);
    }
}
