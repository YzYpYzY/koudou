import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { OptionModel } from 'yzy-ng';
import { environment } from './../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MiscService {
    constructor(private httpClient: HttpClient) {}

    loadSectionOptions(): Observable<OptionModel[]> {
        return this.httpClient
            .get<OptionModel[]>(environment.api + '/Section/Options')
            .pipe(delay(5000));
    }
}
