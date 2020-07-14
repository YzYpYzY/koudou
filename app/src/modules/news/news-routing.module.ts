import { NewsConsultComponent } from './news-consult/news-consult.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './news.component';

const routes: Routes = [
    { path: '', component: NewsConsultComponent },
    { path: 'management', component: NewsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NewsRoutingModule {}
