import { PaymentTypePipe } from './pipes/payment-type.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { PaymentRoutingModule } from './payment-routing.module';
import { NgxsModule } from '@ngxs/store';
import { CoreModule } from '@core/core.module';
import { YzYFormsModule, FieldModule, TableModule, LayoutModule } from 'yzy-ng';
import { PaymentStore } from './state/payment.store';

@NgModule({
    declarations: [PaymentComponent, PaymentTypePipe],
    imports: [
        CommonModule,
        PaymentRoutingModule,
        NgxsModule.forFeature([PaymentStore]),
        CoreModule,
        YzYFormsModule,
        FieldModule,
        TableModule,
        LayoutModule,
    ],
    providers: [PaymentTypePipe],
})
export class PaymentModule {}
