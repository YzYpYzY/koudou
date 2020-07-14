import { IListRequest } from '@core/models/IListRequest';
import { takeUntil, tap } from 'rxjs/operators';
import { NewsService } from './../state/news.service';
import { Component, OnInit } from '@angular/core';
import { INews } from '../models/INews';
import { BaseComponent } from 'yzy-ng';

@Component({
    selector: 'koudou-news-consult',
    templateUrl: './news-consult.component.html',
    styleUrls: ['./news-consult.component.scss'],
})
export class NewsConsultComponent extends BaseComponent implements OnInit {
    newsList: INews[];
    newsCount: number;
    request: IListRequest;
    itemByPage = 5;
    selectedPage = 1;

    constructor(private newsService: NewsService) {
        super();
        this.newsService.news$
            .pipe(takeUntil(this.destroy$))
            .subscribe((news) => {
                this.newsList = news;
            });
        this.newsService.newsCount$
            .pipe(takeUntil(this.destroy$))
            .subscribe((newsCount) => {
                this.newsCount = newsCount;
            });
    }

    ngOnInit(): void {
        this.request = {
            sort: null,
            sortDirection: null,
            startIndex: 0,
            count: this.itemByPage,
            filter: null,
        };
        this.fetchNews();
    }

    fetchNews(): void {
        this.newsService.fetchAll(this.request);
    }

    pageChange(newPage: number): void {
        this.request.startIndex = (newPage - 1) * this.itemByPage;
        this.fetchNews();
    }
}
