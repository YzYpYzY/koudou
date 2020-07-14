import { CrudStates } from '@core/enums';
import { INewsletterSubscriber } from './../models/INewsletterSubscriber';
import { IListRequest } from '@core/models/IListRequest';

export interface NewsletterSubscriberState {
    newsletterSubscribers: INewsletterSubscriber[];
    newsletterSubscribersCount: number;
    selectedNewsletterSubscriberId: number;
    selectedNewsletterSubscriber: INewsletterSubscriber;
    request: IListRequest;
    error: any;
    viewState: CrudStates;
    isNewsletterSubscriberLoading: boolean;
}

export const NewsletterSubscriberStateDefault = {
    newsletterSubscribers: null,
    newsletterSubscribersCount: 0,
    selectedNewsletterSubscriberId: null,
    selectedNewsletterSubscriber: null,
    request: null,
    error: null,
    viewState: CrudStates.List,
    isNewsletterSubscriberLoading: false,
};
