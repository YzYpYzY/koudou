import { IListRequest } from '@core/models/IListRequest';
export interface IListResponse<T> {
    values: T[];
    options: IListRequest;
    totalCount: number;
}
