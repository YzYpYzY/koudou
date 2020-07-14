import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsletterSubscriberComponent } from './newsletter-subscriber.component';
import { NewsletterSubscriberRoutingModule } from './newsletter-subscriber-routing.module';
import { NgxsModule } from '@ngxs/store';
import { CoreModule } from '@core/core.module';
import { YzYFormsModule, FieldModule, TableModule, LayoutModule } from 'yzy-ng';
import { NewsletterSubscriberStore } from './state/newsletter-subscriber.store';

@NgModule({
    declarations: [NewsletterSubscriberComponent],
    imports: [
        CommonModule,
        NewsletterSubscriberRoutingModule,
        NgxsModule.forFeature([NewsletterSubscriberStore]),
        CoreModule,
        YzYFormsModule,
        FieldModule,
        TableModule,
        LayoutModule,
    ],
})
export class NewsletterSubscriberModule {}
