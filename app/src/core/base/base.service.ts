import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NotificationType } from '../services/notification.service';
import { NotificationService } from '../services/notification.service';

export class BaseService {
    constructor(
        protected client: HttpClient,
        protected notificationService: NotificationService
    ) {
        this.client = client;
    }

    get<T = Response>(route: string[], params: object = null): Observable<T> {
        let url = this.formatUrl(route);
        if (params) {
            url += '?' + this.formatParameters(params);
        }
        return this.client.get(url).pipe(map(res => res as T));
    }

    private formatUrl(route: string[]): string {
        return environment.api + '/' + route.join('/');
    }

    private formatParameters(params: object): string {
        let formatedParams = '';
        for (const key in params) {
            if ((params as any)[key] !== '' && (params as any)[key] !== null) {
                formatedParams += `${key}=${(params as any)[key]}&`;
            }
        }
        if (formatedParams !== '') {
            formatedParams = formatedParams.substr(
                0,
                formatedParams.length - 1
            );
        }
        return formatedParams;
    }

    delete(route: string[]): Observable<boolean> {
        const url = this.formatUrl(route);
        return this.client.delete(url).pipe(map(() => true));
    }

    post<T = Response>(route: string[], body: {}): Observable<T> {
        const url = this.formatUrl(route);
        return this.client.post(url, body).pipe(map(value => value as T));
    }

    put<T = Response>(route: string[], body: {}): Observable<T> {
        const url = this.formatUrl(route);
        return this.client.put(url, body).pipe(map(value => value as T));
    }

    error(message: string): void {
        this.notificationService.notify({
            text: message,
            type: NotificationType.Error,
        });
    }

    success(message: string): void {
        this.notificationService.notify({
            text: message,
            type: NotificationType.Success,
        });
    }

    warning(message: string): void {
        this.notificationService.notify({
            text: message,
            type: NotificationType.Warning,
        });
    }
}
