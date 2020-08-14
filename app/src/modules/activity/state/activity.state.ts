import { CrudStates } from '@core/enums';
import { IActivity } from './../models/IActivity';
import { IListRequest } from '@core/models/IListRequest';
import { IFullActivity } from '../models/IFullActivity';

export interface ActivityState {
    activitys: IActivity[];
    activitysCount: number;
    selectedActivityId: number;
    selectedActivity: IFullActivity;
    request: IListRequest;
    error: any;
    viewState: CrudStates;
    isActivityLoading: boolean;
}

export const ActivityStateDefault: ActivityState = {
    activitys: null,
    activitysCount: 0,
    selectedActivityId: null,
    selectedActivity: null,
    request: null,
    error: null,
    viewState: CrudStates.List,
    isActivityLoading: false,
};
