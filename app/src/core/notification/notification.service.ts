import { KoudouNotification } from '../models/KoudouNotification';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    clear$ = new Subject<boolean>();
    newNotification$ = new Subject<KoudouNotification>();

    private notifIdCouter = 0;

    constructor() {}

    notify(notification: KoudouNotification): void {
        this.notifIdCouter++;
        notification.id = this.notifIdCouter;
        notification.fadeout = false;
        notification.duration =
            notification.duration !== undefined ? notification.duration : 10;
        this.newNotification$.next(notification);
    }
    clear(): void {
        this.clear$.next(true);
    }
}
