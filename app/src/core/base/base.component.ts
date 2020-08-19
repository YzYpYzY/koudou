import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ClaimTypes } from '@core/enums/ClaimTypes';

export class BaseComponent implements OnDestroy {
    protected destroy$: Subject<any> = new Subject<any>();
    ClaimTypes = ClaimTypes;
    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
