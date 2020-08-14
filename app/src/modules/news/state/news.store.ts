import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NewsState, NewsStateDefault } from './news.state';
import { NewsApiService } from '../news-api.service';
import { NewsActions } from './news.actions';
import { INews } from '../models/INews';
import { IListResponse } from '@core/models/IListResponse';

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
    static isNewsLoading$(state: NewsState) {
        return state.isNewsLoading;
    }
    constructor(private newsApiService: NewsApiService) {}

    @Action(NewsActions.FetchAll)
    fetchAll(
        { patchState }: StateContext<NewsState>,
        { request }: NewsActions.FetchAll,
    ) {
        patchState({
            isNewsLoading: true,
        });
        return this.newsApiService.fetchAll(request).pipe(
            tap((res: IListResponse<INews>) => {
                patchState({
                    news: res.values,
                    newsCount: res.totalCount,
                    isNewsLoading: false,
                });
            }),
            catchError((error: Error) => {
                patchState({
                    error: error.message,
                    isNewsLoading: false,
                });
                return of(error);
            }),
        );
    }

    @Action(NewsActions.Select)
    select({ patchState }: StateContext<NewsState>, { newsId }: NewsActions.Select) {
        patchState({
            selectedNewsId: newsId,
            selectedNews: null,
        });
    }

    @Action(NewsActions.Save)
    save({ patchState }: StateContext<NewsState>, { news }: NewsActions.Save) {
        patchState({
            isNewsLoading: true,
        });
        if (news.id) {
            return this.newsApiService.update(news.id, news).pipe(
                tap((res: INews) => {
                    patchState({
                        selectedNewsId: news.id,
                        selectedNews: res,
                        isNewsLoading: false,
                    });
                }),
                catchError((error: Error) => {
                    patchState({
                        error: error.message,
                        isNewsLoading: false,
                    });
                    return of(error);
                }),
            );
        } else {
            return this.newsApiService.create(news).pipe(
                tap((res: INews) => {
                    patchState({
                        selectedNewsId: news.id,
                        selectedNews: res,
                        isNewsLoading: false,
                    });
                }),
                catchError((error: Error) => {
                    patchState({
                        error: error.message,
                        isNewsLoading: false,
                    });
                    return of(error);
                }),
            );
        }
    }

    @Action(NewsActions.Delete)
    delete(
        { patchState }: StateContext<NewsState>,
        { newsId }: NewsActions.Delete,
    ) {
        patchState({
            isNewsLoading: true,
        });
        return this.newsApiService.remove(newsId).pipe(
            tap(() => {
                patchState({
                    selectedNewsId: null,
                    selectedNews: null,
                    news: null,
                    newsCount: null,
                    isNewsLoading: false,
                });
            }),
            catchError((error: Error) => {
                patchState({
                    error: error.message,
                    isNewsLoading: false,
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
        patchState({
            viewState: newState,
        });
    }
}
