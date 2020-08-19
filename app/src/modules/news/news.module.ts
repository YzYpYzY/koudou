import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { NewsRoutingModule } from './news-routing.module';
import { NgxsModule } from '@ngxs/store';
import { CoreModule } from '@core/core.module';
import { YzYFormsModule, FieldModule, TableModule, LayoutModule } from 'yzy-ng';
import { NewsStore } from './state/news.store';
import { NewsConsultComponent } from './news-consult/news-consult.component';
import { NewsFormComponent } from './news-form/news-form.component';

@NgModule({
    declarations: [NewsComponent, NewsConsultComponent, NewsFormComponent],
    imports: [
        CommonModule,
        NewsRoutingModule,
        NgxsModule.forFeature([NewsStore]),
        CoreModule,
        YzYFormsModule,
        FieldModule,
        TableModule,
        LayoutModule,
    ],
})
export class NewsModule {}
