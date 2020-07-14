import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberComponent } from './member.component';
import { MemberRoutingModule } from './member-routing.module';
import { MemberStore } from './state/member.store';
import { NgxsModule } from '@ngxs/store';
import { CoreModule } from '@core/core.module';
import { MemberFormComponent } from './member-form/member-form.component';
import {
    YzYFormsModule,
    FieldModule,
    TableModule,
    LayoutModule,
    RadioModule,
} from 'yzy-ng';

@NgModule({
    declarations: [MemberComponent, MemberFormComponent],
    imports: [
        CommonModule,
        MemberRoutingModule,
        NgxsModule.forFeature([MemberStore]),
        CoreModule,
        YzYFormsModule,
        FieldModule,
        TableModule,
        LayoutModule,
        RadioModule,
    ],
})
export class MemberModule {}
