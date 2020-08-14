import { CrudStates } from '@core/enums';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IListRequest } from '@core/models/IListRequest';
import { Store, Select } from '@ngxs/store';
import { ActivityActions } from './activity.actions';
import { ActivityStore } from './activity.store';
import { IActivity } from '../models/IActivity';
import { IFullActivity } from '../models/IFullActivity';

@Injectable({ providedIn: 'root' })
export class ActivityService {
    @Select(ActivityStore.activitys$)
    activitys$: Observable<IActivity[]>;
    @Select(ActivityStore.activitysCount$)
    activitysCount$: Observable<number>;
    @Select(ActivityStore.selectedActivity$)
    selectedActivity$: Observable<IFullActivity>;
    @Select(ActivityStore.error$)
    error$: Observable<string>;
    @Select(ActivityStore.state$)
    state$: Observable<CrudStates>;
    @Select(ActivityStore.error$)
    activityError$: Observable<string>;

    constructor(private store: Store) {}

    fetchAll(request: IListRequest): void {
        this.store.dispatch(new ActivityActions.FetchAll(request));
    }

    select(activityId: number): void {
        this.store.dispatch(new ActivityActions.Select(activityId));
    }

    save(activity: IFullActivity): void {
        this.store.dispatch(new ActivityActions.Save(activity));
    }
    delete(activityId: number) {
        this.store.dispatch(new ActivityActions.Delete(activityId));
    }

    setState(newState: CrudStates) {
        this.store.dispatch(new ActivityActions.SetViewState(newState));
    }
}
