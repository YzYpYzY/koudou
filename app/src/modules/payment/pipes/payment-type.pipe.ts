import { PaymentTypes } from '../models/IPayment';
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'payments-type',
})
export class PaymentTypePipe implements PipeTransform {
    transform(type: PaymentTypes): string {
        switch (type) {
            case PaymentTypes.Autre:
                return 'Autre';
            case PaymentTypes.Camp:
                return 'Camp';
            case PaymentTypes.Cotisation:
                return 'Cotisation';
            case PaymentTypes.Hike:
                return 'Hike';
        }
    }
}
