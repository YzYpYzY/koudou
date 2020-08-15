import { NotificationService } from './notification.service';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { KoudouNotification } from '../models/KoudouNotification';
import { NotificationTypes } from '../enums/NotificationTypes';

@Component({
    selector: 'koudou-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit, OnDestroy {
    NotificationTypes = NotificationTypes;
    notifications: KoudouNotification[] = [];
    destroy$ = new Subject<boolean>();

    constructor(
        private notificationService: NotificationService,
        private cdr: ChangeDetectorRef,
    ) {}

    ngOnInit() {
        this.notificationService.clear$
            .pipe(takeUntil(this.destroy$))
            .subscribe((value: boolean) => {
                if (value) {
                    this.clear();
                }
            });
        this.notificationService.newNotification$
            .pipe(takeUntil(this.destroy$))
            .subscribe((notif: KoudouNotification) => {
                this.addNotif(notif);
            });
    }

    clear(): void {
        this.notifications = [];
    }

    trackNotif(_index: number, item: KoudouNotification): number {
        return item.id;
    }

    addNotif(notif: KoudouNotification): void {
        this.notifications.push(notif);
        if (notif.duration !== 0) {
            setTimeout(() => this.decreaseTime(notif), 1000);
        }
    }

    close(id: number): void {
        const notifs = [...this.notifications].filter((n) => n.id !== id);
        this.notifications = notifs;
    }

    decreaseTime(notification: KoudouNotification) {
        if (notification.duration === -1) {
            this.close(notification.id);
        } else {
            notification.duration--;
            setTimeout(() => this.decreaseTime(notification), 1000);
            if (notification.duration === 0) {
                notification.fadeout = true;
            }
        }
        this.cdr.detectChanges();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
