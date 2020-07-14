import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    private notificationSubject$ = new Subject<KoudouNotification>();

    get notification$(): Observable<KoudouNotification> {
        return this.notificationSubject$.asObservable();
    }

    constructor() {}

    notify(notif: KoudouNotification) {
        this.notificationSubject$.next(notif);
    }
}

export class KoudouNotification {
    text: string;
    type: NotificationType;
}

export enum NotificationType {
    Success = 'success',
    Warning = 'warning',
    Error = 'error',
}
