import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ActivityState, ActivityStateDefault } from './activity.state';
import { ActivityApiService } from '../activity-api.service';
import { ActivityActions } from './activity.actions';
import { IActivity } from '../models/IActivity';
import { IListResponse } from '@core/models/IListResponse';
import { IFullActivity } from '../models/IFullActivity';

@Injectable()
@State<ActivityState>({
    name: 'activity',
    defaults: ActivityStateDefault,
})
export class ActivityStore {
    @Selector()
    static activitys$(state: ActivityState) {
        return state.activitys;
    }
    @Selector()
    static activitysCount$(state: ActivityState) {
        return state.activitysCount;
    }
    @Selector()
    static selectedActivity$(state: ActivityState) {
        return state.selectedActivity;
    }
    @Selector()
    static selectedActivityId$(state: ActivityState) {
        return state.selectedActivityId;
    }
    @Selector()
    static error$(state: ActivityState) {
        return state.error;
    }
    @Selector()
    static state$(state: ActivityState) {
        return state.viewState;
    }
    @Selector()
    static isActivityLoading$(state: ActivityState) {
        return state.isActivityLoading;
    }
    constructor(private activityApiService: ActivityApiService) {}

    @Action(ActivityActions.FetchAll)
    fetchAll(
        { patchState }: StateContext<ActivityState>,
        { request }: ActivityActions.FetchAll,
    ) {
        patchState({
            isActivityLoading: true,
        });
        return this.activityApiService.fetchAll(request).pipe(
            tap((res: IListResponse<IActivity>) => {
                patchState({
                    activitys: res.values,
                    activitysCount: res.totalCount,
                    isActivityLoading: false,
                });
            }),
            catchError((error: Error) => {
                patchState({
                    error: error.message,
                    isActivityLoading: false,
                });
                return of(error);
            }),
        );
    }

    @Action(ActivityActions.FetchOne)
    fetchOne(
        { patchState }: StateContext<ActivityState>,
        { activityId }: ActivityActions.FetchOne,
    ) {
        patchState({
            isActivityLoading: true,
        });
        return this.activityApiService.fetchOne(activityId).pipe(
            tap((res: IFullActivity) => {
                patchState({
                    selectedActivity: res,
                    isActivityLoading: false,
                });
            }),
            catchError((error: Error) => {
                patchState({
                    error: error.message,
                    isActivityLoading: false,
                });
                return of(error);
            }),
        );
    }

    @Action(ActivityActions.Select)
    select(
        { patchState }: StateContext<ActivityState>,
        { activityId }: ActivityActions.Select,
    ) {
        patchState({
            selectedActivityId: activityId,
            selectedActivity: null,
        });
    }

    @Action(ActivityActions.Save)
    save(
        { patchState }: StateContext<ActivityState>,
        { activity }: ActivityActions.Save,
    ) {
        patchState({
            isActivityLoading: true,
        });
        if (activity.id) {
            return this.activityApiService.update(activity.id, activity).pipe(
                tap((res: IFullActivity) => {
                    patchState({
                        selectedActivityId: activity.id,
                        selectedActivity: res,
                        isActivityLoading: false,
                    });
                }),
                catchError((error: Error) => {
                    patchState({
                        error: error.message,
                        isActivityLoading: false,
                    });
                    return of(error);
                }),
            );
        } else {
            return this.activityApiService.create(activity).pipe(
                tap((res: IFullActivity) => {
                    patchState({
                        selectedActivityId: activity.id,
                        selectedActivity: res,
                        isActivityLoading: false,
                    });
                }),
                catchError((error: Error) => {
                    patchState({
                        error: error.message,
                        isActivityLoading: false,
                    });
                    return of(error);
                }),
            );
        }
    }

    @Action(ActivityActions.Delete)
    delete(
        { patchState }: StateContext<ActivityState>,
        { activityId }: ActivityActions.Delete,
    ) {
        patchState({
            isActivityLoading: true,
        });
        return this.activityApiService.remove(activityId).pipe(
            tap(() => {
                patchState({
                    selectedActivityId: null,
                    selectedActivity: null,
                    activitys: null,
                    activitysCount: null,
                    isActivityLoading: false,
                });
            }),
            catchError((error: Error) => {
                patchState({
                    error: error.message,
                    isActivityLoading: false,
                });
                return of(error);
            }),
        );
    }
    @Action(ActivityActions.SetViewState)
    setViewState(
        { patchState }: StateContext<ActivityState>,
        { newState }: ActivityActions.SetViewState,
    ) {
        patchState({
            viewState: newState,
        });
    }
}
