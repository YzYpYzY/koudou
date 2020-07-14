import { ISort } from './ISort';
import { IFilter } from './IFilter';

export interface IListRequest {
    startIndex: number;
    count: number;
    sort: string;
    sortDirection: 0 | 1;
    filter: string;
}
