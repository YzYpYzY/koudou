import { Component, OnInit } from '@angular/core';
import { CrudStates } from '@core/enums/CrudStates';
import {
    YzYSort,
    Column,
    FormModel,
    FieldTypes,
    YzYAction,
    BaseComponent,
    YzYActionTypes,
    AnswerType,
    Answer,
} from 'yzy-ng';
import { FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { INews } from './models/INews';
import { IListRequest } from '../../core/models/IListRequest';
import { NewsService } from './state/news.service';

@Component({
    selector: 'koudou-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss'],
})
export class NewsComponent extends BaseComponent implements OnInit {
    CrudStates = CrudStates;
    selectedNews$: Observable<INews>;
    selectedNews: INews;

    news: INews[] = [];
    newsCount = 0;
    columns: Column[] = [
        { name: 'Titre', attribute: 'title' },
        { name: 'Date', attribute: 'date' },
        { name: 'Créateur', attribute: 'creator' },
    ];
    filtersModel: FormModel = {
        title: null,
        fields: [
            {
                name: 'filter',
                label: 'Rechercher',
                type: FieldTypes.Text,
            },
        ],
    };
    lineActions: YzYAction[] = [
        { name: 'read', class: 'gg-search', type: YzYActionTypes.Info },
        { name: 'edit', class: 'gg-pen', type: YzYActionTypes.Warning },
        { name: 'delete', class: 'gg-trash', type: YzYActionTypes.Error },
    ];
    headerActions: YzYAction[] = [
        { name: 'add', class: 'gg-math-plus', type: YzYActionTypes.Success },
    ];
    state = CrudStates.List;
    request: IListRequest;
    itemByPage = 20;
    valuesForForm = null;
    newsIdForDelete: number = null;
    question = 'Ètes-vous certains de vouloir supprimer cet news ?';
    answer = [
        { label: 'Annuler', value: false, type: AnswerType.Default },
        { label: 'Oui', value: true, type: AnswerType.Danger },
    ];
    constructor(private newsService: NewsService) {
        super();
        this.newsService.news$
            .pipe(takeUntil(this.destroy$))
            .subscribe((news) => {
                this.news = news;
            });
        this.newsService.selectedNews$
            .pipe(takeUntil(this.destroy$))
            .subscribe((news) => {
                this.selectedNews = news;
            });
        this.newsService.newsCount$
            .pipe(takeUntil(this.destroy$))
            .subscribe((newsCount) => (this.newsCount = newsCount));
        this.selectedNews$ = this.newsService.selectedNews$;
    }

    ngOnInit() {
        this.request = {
            sort: null,
            sortDirection: null,
            startIndex: 0,
            count: this.itemByPage,
            filter: null,
        };
        this.fetchNews();
    }

    add() {
        this.select(null);
        this.state = CrudStates.Create;
    }
    cancel() {
        this.state = CrudStates.List;
    }
    select(newsId: number) {
        this.newsService.select(newsId);
        this.state = CrudStates.Read;
    }
    save(news: INews) {
        this.newsService.save(news);
        this.state = CrudStates.Read;
    }
    update() {
        this.state = CrudStates.Update;
    }
    delete(newsId: number): void {
        this.newsService.delete(newsId);
    }

    sort(newSort: YzYSort): void {
        if (newSort == null) {
            this.request.sort = null;
            this.request.sortDirection = null;
        } else {
            this.request.sort =
                newSort.attribute.charAt(0).toUpperCase() +
                newSort.attribute.slice(1);
            this.request.sortDirection = !newSort.isDesc ? 1 : 0;
        }
        this.fetchNews();
    }

    filterFormReady(form: FormGroup): void {
        form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((change) => {
            this.request.filter = change.filter;
            this.fetchNews();
        });
    }

    pageChange(newPage: number): void {
        this.request.startIndex = (newPage - 1) * this.itemByPage;
        this.fetchNews();
    }

    fetchNews(): void {
        this.newsService.fetchAll(this.request);
    }

    handleHeaderAction(action: YzYAction): void {
        if (action.name === 'add') {
            this.add();
        }
    }

    handleLineActions({ action, key }): void {
        switch (action.name) {
            case 'read':
                this.select(key);
                break;
            case 'edit':
                this.select(key);
                this.update();
                break;
            case 'delete':
                this.showDelete(key);
                break;
        }
    }

    confirmDelete(answer: Answer): void {
        if (answer.value) {
            this.delete(this.newsIdForDelete);
        }
        this.newsIdForDelete = null;
    }

    showDelete(newsId?: number): void {
        this.newsIdForDelete = newsId ? newsId : this.selectedNews.id;
    }
}
