import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, map } from 'rxjs/operators';
import { OptionModel } from 'yzy-ng';

@Injectable({ providedIn: 'root' })
export class MiscService {
    constructor(private httpClient: HttpClient) {}

    loadSectionOptions(): Observable<OptionModel[]> {
        return this.httpClient
            .get<OptionModel[]>(environment.api + '/Section/Options')
            .pipe(delay(5000));
    }
}
