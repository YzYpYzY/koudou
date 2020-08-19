import { Component, OnInit } from '@angular/core';
import { CrudStates } from '@core/enums/CrudStates';
import {
    YzYSort,
    Column,
    FormModel,
    FieldTypes,
    YzYAction,
    YzYActionTypes,
    YzYActionEvent,
    Answer,
    AnswerType,
} from 'yzy-ng';
import { FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NewsletterSubscriber } from './models/INewsletterSubscriber';
import { IListRequest } from '../../core/models/IListRequest';
import { NewsletterSubscriberService } from './state/newsletter-subscriber.service';
import { BaseComponent } from '@core/base/base.component';
@Component({
    selector: 'koudou-newsletter-subscriber',
    templateUrl: './newsletter-subscriber.component.html',
    styleUrls: ['./newsletter-subscriber.component.scss'],
})
export class NewsletterSubscriberComponent extends BaseComponent
    implements OnInit {
    CrudStates = CrudStates;
    selectedNewsletterSubscriber$: Observable<NewsletterSubscriber>;
    selectedNewsletterSubscriber: NewsletterSubscriber;
    newsletterSubscribers: NewsletterSubscriber[] = [];
    newsletterSubscribersCount = 0;
    columns: Column[] = [
        { name: 'Email', attribute: 'email' },
        { name: 'Nom', attribute: 'name' },
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
    headerActions: YzYAction[] = [
        { name: 'add', class: 'gg-math-plus', type: YzYActionTypes.Success },
    ];
    state = CrudStates.List;
    request: IListRequest;
    itemByPage = 30;
    loading$: Observable<boolean>;
    lineActions: YzYAction[] = [
        { name: 'read', class: 'gg-search', type: YzYActionTypes.Info },
        { name: 'edit', class: 'gg-pen', type: YzYActionTypes.Warning },
        { name: 'delete', class: 'gg-trash', type: YzYActionTypes.Error },
    ];
    newsletterSubscriberIdForDelete: number;
    question = 'Ètes-vous certains de vouloir supprimer cette souscription ?';
    answer = [
        { label: 'Annuler', value: false, type: AnswerType.Default },
        { label: 'Oui', value: true, type: AnswerType.Danger },
    ];

    constructor(
        private newsletterSubscriberService: NewsletterSubscriberService,
    ) {
        super();
        this.newsletterSubscriberService.newsletterSubscribers$
            .pipe(takeUntil(this.destroy$))
            .subscribe((newsletterSubscribers) => {
                this.newsletterSubscribers = newsletterSubscribers;
            });
        this.newsletterSubscriberService.newsletterSubscribersCount$
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (newsletterSubscribersCount) =>
                    (this.newsletterSubscribersCount = newsletterSubscribersCount),
            );
        this.newsletterSubscriberService.state$
            .pipe(takeUntil(this.destroy$))
            .subscribe((newState: CrudStates) => (this.state = newState));
        this.newsletterSubscriberService.selectedNewsletterSubscriber$
            .pipe(takeUntil(this.destroy$))
            .subscribe((selectedSubscriber) => {
                this.selectedNewsletterSubscriber = selectedSubscriber;
            });
        this.loading$ = this.newsletterSubscriberService.loading$;
    }

    ngOnInit() {
        this.request = {
            sort: null,
            sortDirection: null,
            startIndex: 0,
            count: 20,
            filter: null,
        };
        this.fetchNewsletterSubscribers();
    }

    add() {
        this.newsletterSubscriberService.setState(CrudStates.Create);
    }
    cancel() {
        this.newsletterSubscriberService.setState(CrudStates.List);
    }
    select(newsletterSubscriberId: number) {
        this.newsletterSubscriberService.select(newsletterSubscriberId);
    }
    save(newsletterSubscriber: NewsletterSubscriber) {
        this.newsletterSubscriberService.save(newsletterSubscriber);
    }
    update() {
        this.newsletterSubscriberService.setState(CrudStates.Update);
    }
    delete(newsletterSubscriberId: number): void {
        this.newsletterSubscriberService.delete(newsletterSubscriberId);
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
        this.fetchNewsletterSubscribers();
    }

    filterFormReady(form: FormGroup): void {
        form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((change) => {
            this.request.filter = change.filter;
            this.fetchNewsletterSubscribers();
        });
    }

    pageChange(newPage: number): void {
        this.request.startIndex = (newPage - 1) * this.itemByPage;
        this.fetchNewsletterSubscribers();
    }

    fetchNewsletterSubscribers(): void {
        this.newsletterSubscriberService.fetchAll(this.request);
    }

    handleHeaderAction(action: YzYAction): void {
        if (action.name === 'add') {
            this.add();
        }
    }
    handleFormActions(action: YzYAction): void {
        switch (action.name) {
            case 'read':
                this.select(this.selectedNewsletterSubscriber.id);
                break;
            case 'edit':
                this.select(this.selectedNewsletterSubscriber.id);
                this.update();
                break;
            case 'delete':
                this.showDelete(this.selectedNewsletterSubscriber.id);
                break;
            case 'cancel':
                this.cancel();
                break;
        }
    }
    handleLineActions({ action, key }: YzYActionEvent): void {
        switch (action.name) {
            case 'read':
                this.select(key as number);
                break;
            case 'edit':
                this.select(key as number);
                this.update();
                break;
            case 'delete':
                this.showDelete(key as number);
                break;
        }
    }

    confirmDelete(answer: Answer): void {
        if (answer.value) {
            this.delete(this.newsletterSubscriberIdForDelete);
        }
        this.newsletterSubscriberIdForDelete = null;
    }

    showDelete(newsletterSubscriberId?: number): void {
        this.newsletterSubscriberIdForDelete = newsletterSubscriberId
            ? newsletterSubscriberId
            : this.selectedNewsletterSubscriber.id;
    }
}
