import { CrudStates } from '@core/enums';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IListRequest } from '@core/models/IListRequest';
import { Store, Select } from '@ngxs/store';
import { SectionActions } from './section.actions';
import { SectionStore } from './section.store';
import { ISection } from '../models/ISection';

@Injectable({ providedIn: 'root' })
export class SectionService {
    @Select(SectionStore.sections$)
    sections$: Observable<ISection[]>;
    @Select(SectionStore.sectionsCount$)
    sectionsCount$: Observable<number>;
    @Select(SectionStore.selectedSection$)
    selectedSection$: Observable<ISection>;
    @Select(SectionStore.error$)
    error$: Observable<string>;
    @Select(SectionStore.state$)
    state$: Observable<CrudStates>;

    constructor(private store: Store) {}

    fetchAll(request: IListRequest): void {
        this.store.dispatch(new SectionActions.FetchAll(request));
    }

    select(sectionId: number): void {
        this.store.dispatch(new SectionActions.Select(sectionId));
    }

    save(section: ISection): void {
        this.store.dispatch(new SectionActions.Save(section));
    }
    delete(sectionId: number) {
        this.store.dispatch(new SectionActions.Delete(sectionId));
    }

    setState(newState: CrudStates) {
        this.store.dispatch(new SectionActions.SetViewState(newState));
    }
}
