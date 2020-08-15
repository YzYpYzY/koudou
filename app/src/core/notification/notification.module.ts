import { NotificationService } from './notification.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { NotificationDomService } from './notification-dom.service';

@NgModule({
    declarations: [NotificationComponent],
    imports: [CommonModule],
    providers: [NotificationDomService, NotificationService],
    exports: [NotificationComponent],
})
export class NotificationModule {}
export * from './notification.service';
export * from './notification-dom.service';
