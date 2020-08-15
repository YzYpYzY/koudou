import { NotificationTypes } from './../enums/NotificationTypes';
export interface KoudouNotification {
    id?: number;
    title?: string;
    message: string;
    type: NotificationTypes;
    duration?: number;
    fadeout?: boolean;
}
