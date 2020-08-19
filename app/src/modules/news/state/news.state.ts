import { CrudStates } from '@core/enums';
import { INews } from './../models/INews';
import { IListRequest } from '@core/models/IListRequest';

export interface NewsState {
    news: INews[];
    newsCount: number;
    selectedNewsId: number;
    selectedNews: INews;
    request: IListRequest;
    error: any;
    viewState: CrudStates;
    loading: boolean;
}

export const NewsStateDefault: NewsState = {
    news: null,
    newsCount: 0,
    selectedNewsId: null,
    selectedNews: null,
    request: null,
    error: null,
    viewState: CrudStates.List,
    loading: false,
};
