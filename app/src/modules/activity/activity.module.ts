import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityComponent } from './activity.component';
import { ActivityRoutingModule } from './activity-routing.module';
import { NgxsModule } from '@ngxs/store';
import { CoreModule } from '@core/core.module';
import { YzYFormsModule, FieldModule, TableModule, LayoutModule } from 'yzy-ng';
import { ActivityStore } from './state/activity.store';
import { ActivityFormComponent } from './activity-form/activity-form.component';

@NgModule({
    declarations: [ActivityComponent, ActivityFormComponent],
    imports: [
        CommonModule,
        ActivityRoutingModule,
        NgxsModule.forFeature([ActivityStore]),
        CoreModule,
        YzYFormsModule,
        FieldModule,
        TableModule,
        LayoutModule,
    ],
})
export class ActivityModule {}
