import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsletterSubscriberComponent } from './newsletter-subscriber.component';

const routes: Routes = [{ path: '', component: NewsletterSubscriberComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NewsletterSubscriberRoutingModule {}
