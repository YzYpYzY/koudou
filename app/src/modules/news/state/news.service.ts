import { CrudStates } from '@core/enums';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IListRequest } from '@core/models/IListRequest';
import { Store, Select } from '@ngxs/store';
import { NewsActions } from './news.actions';
import { NewsStore } from './news.store';
import { INews } from '../models/INews';

@Injectable({ providedIn: 'root' })
export class NewsService {
    @Select(NewsStore.news$)
    news$: Observable<INews[]>;
    @Select(NewsStore.newsCount$)
    newsCount$: Observable<number>;
    @Select(NewsStore.selectedNews$)
    selectedNews$: Observable<INews>;
    @Select(NewsStore.error$)
    error$: Observable<string>;
    @Select(NewsStore.state$)
    state$: Observable<CrudStates>;

    constructor(private store: Store) {}

    fetchAll(request: IListRequest): void {
        this.store.dispatch(new NewsActions.FetchAll(request));
    }

    select(newsId: number): void {
        this.store.dispatch(new NewsActions.Select(newsId));
    }

    save(news: INews): void {
        this.store.dispatch(new NewsActions.Save(news));
    }
    delete(newsId: number) {
        this.store.dispatch(new NewsActions.Delete(newsId));
    }

    setState(newState: CrudStates) {
        this.store.dispatch(new NewsActions.SetViewState(newState));
    }
}
