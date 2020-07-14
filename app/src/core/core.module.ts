import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { LogoComponent } from './logo/logo.component';
import { NotificationService } from './services/notification.service';
import { MiscService } from './services/misc.service';

@NgModule({
    declarations: [LoaderComponent, LogoComponent],
    imports: [CommonModule],
    exports: [LoaderComponent, LogoComponent],
    providers: [NotificationService, MiscService],
})
export class CoreModule {}
