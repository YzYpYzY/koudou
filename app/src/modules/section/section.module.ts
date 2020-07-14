import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from './section.component';
import { SectionRoutingModule } from './section-routing.module';
import { NgxsModule } from '@ngxs/store';
import { CoreModule } from '@core/core.module';
import { YzYFormsModule, FieldModule, TableModule, LayoutModule } from 'yzy-ng';
import { SectionStore } from './state/section.store';

@NgModule({
    declarations: [SectionComponent],
    imports: [
        CommonModule,
        SectionRoutingModule,
        NgxsModule.forFeature([SectionStore]),
        CoreModule,
        YzYFormsModule,
        FieldModule,
        TableModule,
        LayoutModule,
    ],
})
export class SectionModule {}
