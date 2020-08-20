import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NewsState, NewsStateDefault } from './news.state';
import { NewsApiService } from '../news-api.service';
import { NewsActions } from './news.actions';
import { INews } from '../models/INews';
import { IListResponse } from '@core/models/IListResponse';
import { NotificationService } from '@core/notification/notification.module';
import { NotificationTypes, CrudStates } from '@core/enums';

@Injectable()
@State<NewsState>({
    name: 'news',
    defaults: NewsStateDefault,
})
export class NewsStore {
    @Selector()
    static news$(state: NewsState) {
        return state.news;
    }
    @Selector()
    static newsCount$(state: NewsState) {
        return state.newsCount;
    }
    @Selector()
    static selectedNews$(state: NewsState) {
        return state.selectedNews;
    }
    @Selector()
    static selectedNewsId$(state: NewsState) {
        return state.selectedNewsId;
    }
    @Selector()
    static error$(state: NewsState) {
        return state.error;
    }
    @Selector()
    static state$(state: NewsState) {
        return state.viewState;
    }
    @Selector()
    static loading$(state: NewsState) {
        return state.loading;
    }
    constructor(
        private newsApiService: NewsApiService,
        private notificationService: NotificationService,
    ) {}

    @Action(NewsActions.FetchAll)
    fetchAll(
        { patchState }: StateContext<NewsState>,
        { request }: NewsActions.FetchAll,
    ) {
        patchState({
            loading: true,
        });
        return this.newsApiService.fetchAll(request).pipe(
            tap((res: IListResponse<INews>) => {
                patchState({
                    news: res.values,
                    newsCount: res.totalCount,
                    loading: false,
                    request: { ...request },
                });
            }),
            catchError((error: Error) => {
                patchState({
                    error: error.message,
                    loading: false,
                });
                this.notificationService.notify({
                    type: NotificationTypes.Error,
                    message: 'Les news ne peuvent être chargées.',
                });
                return of(error);
            }),
        );
    }

    @Action(NewsActions.Select)
    select(
        { patchState, getState }: StateContext<NewsState>,
        { newsId, isReadOnly }: NewsActions.Select,
    ) {
        const selectedNews = getState().news.find((n) => n.id == newsId);
        patchState({
            selectedNewsId: newsId,
            selectedNews: selectedNews,
            viewState: isReadOnly ? CrudStates.Read : CrudStates.Update,
        });
    }

    @Action(NewsActions.Save)
    save(
        { dispatch, patchState, getState }: StateContext<NewsState>,
        { news }: NewsActions.Save,
    ) {
        patchState({
            loading: true,
        });
        if (news.id) {
            return this.newsApiService.update(news.id, news).pipe(
                tap((res: INews) => {
                    patchState({
                        selectedNewsId: news.id,
                        selectedNews: res,
                        loading: false,
                        viewState: CrudStates.Read,
                    });
                    this.notificationService.notify({
                        type: NotificationTypes.Success,
                        message: 'La news a été modifiée.',
                    });
                    return dispatch(
                        new NewsActions.FetchAll(getState().request),
                    );
                }),
                catchError((error: Error) => {
                    patchState({
                        error: error.message,
                        loading: false,
                    });
                    this.notificationService.notify({
                        type: NotificationTypes.Error,
                        message: "La news n'a pu être modifiée.",
                    });
                    return of(error);
                }),
            );
        } else {
            news.id = -1;
            news.rowVersion = 0;
            return this.newsApiService.create(news).pipe(
                tap((res: INews) => {
                    patchState({
                        selectedNewsId: news.id,
                        selectedNews: res,
                        loading: false,
                        viewState: CrudStates.Read,
                    });
                    this.notificationService.notify({
                        type: NotificationTypes.Success,
                        message: 'La news a été créée.',
                    });
                    return dispatch(
                        new NewsActions.FetchAll(getState().request),
                    );
                }),
                catchError((error: Error) => {
                    patchState({
                        error: error.message,
                        loading: false,
                    });
                    this.notificationService.notify({
                        type: NotificationTypes.Error,
                        message: "La news n'a pu être créée.",
                    });
                    return of(error);
                }),
            );
        }
    }

    @Action(NewsActions.Delete)
    delete(
        { patchState, dispatch, getState }: StateContext<NewsState>,
        { newsId }: NewsActions.Delete,
    ) {
        patchState({
            loading: true,
        });
        return this.newsApiService.remove(newsId).pipe(
            tap(() => {
                patchState({
                    selectedNewsId: null,
                    selectedNews: null,
                    news: null,
                    newsCount: null,
                    loading: false,
                    viewState: CrudStates.List,
                });
                this.notificationService.notify({
                    type: NotificationTypes.Success,
                    message: 'La news a été supprimée.',
                });
                return dispatch(new NewsActions.FetchAll(getState().request));
            }),
            catchError((error: Error) => {
                patchState({
                    error: error.message,
                    loading: false,
                });
                this.notificationService.notify({
                    type: NotificationTypes.Error,
                    message: "La news n'a pu être supprimée.",
                });
                return of(error);
            }),
        );
    }
    @Action(NewsActions.SetViewState)
    setViewState(
        { patchState }: StateContext<NewsState>,
        { newState }: NewsActions.SetViewState,
    ) {
        if (newState == CrudStates.Create) {
            patchState({
                viewState: newState,
                selectedNewsId: null,
                selectedNews: null,
            });
        } else {
            patchState({
                viewState: newState,
            });
        }
    }
}
