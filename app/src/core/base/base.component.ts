import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class BaseComponent implements OnDestroy {
    protected destroy$: Subject<any> = new Subject<any>();

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
