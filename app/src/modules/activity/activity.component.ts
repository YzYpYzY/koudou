import { IFullActivity } from './models/IFullActivity';
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
    OptionModel,
} from 'yzy-ng';
import { FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IActivity } from './models/IActivity';
import { IListRequest } from '../../core/models/IListRequest';
import { ActivityService } from './state/activity.service';
import { KoudouService } from '../../state/koudou.service';

@Component({
    selector: 'koudou-activity',
    templateUrl: './activity.component.html',
    styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent extends BaseComponent implements OnInit {
    CrudStates = CrudStates;
    selectedActivity$: Observable<IFullActivity>;
    selectedActivity: IFullActivity;
    sectionOptions: OptionModel[] = [];
    activitys: IActivity[] = [];
    activitysCount = 0;
    columns: Column[] = [
        { name: 'Nom', attribute: 'name' },
        { name: 'Date', attribute: 'date' },
        { name: 'Section', attribute: 'section' },
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
    activityIdForDelete: number = null;
    question = 'Ètes-vous certains de vouloir supprimer cette activité ?';
    answer = [
        { label: 'Annuler', value: false, type: AnswerType.Default },
        { label: 'Oui', value: true, type: AnswerType.Danger },
    ];
    constructor(
        private activityService: ActivityService,
        private koudouService: KoudouService,
    ) {
        super();
        this.activityService.activitys$
            .pipe(takeUntil(this.destroy$))
            .subscribe((activitys) => {
                this.activitys = activitys;
            });
        this.activityService.selectedActivity$
            .pipe(takeUntil(this.destroy$))
            .subscribe((activity) => {
                this.selectedActivity = activity;
            });
        this.activityService.activitysCount$
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (activitysCount) => (this.activitysCount = activitysCount),
            );
        this.koudouService.sectionOptions$
            .pipe(takeUntil(this.destroy$))
            .subscribe((options) => (this.sectionOptions = options));
        this.koudouService.loadSectionOptions();
    }

    ngOnInit() {
        this.request = {
            sort: null,
            sortDirection: null,
            startIndex: 0,
            count: this.itemByPage,
            filter: null,
        };
        this.fetchActivitys();
    }

    add() {
        this.select(null);
        this.state = CrudStates.Create;
    }
    cancel() {
        this.state = CrudStates.List;
    }
    select(activityId: number) {
        this.activityService.select(activityId);
        this.state = CrudStates.Read;
    }
    save(activity: IFullActivity) {
        this.activityService.save(activity);
        this.state = CrudStates.Read;
    }
    update() {
        this.state = CrudStates.Update;
    }
    delete(activityId: number): void {
        this.activityService.delete(activityId);
    }
    setViewState(state: CrudStates): void {
        this.state = state;
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
        this.fetchActivitys();
    }

    filterFormReady(form: FormGroup): void {
        form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((change) => {
            this.request.filter = change.filter;
            this.fetchActivitys();
        });
    }

    pageChange(newPage: number): void {
        this.request.startIndex = (newPage - 1) * this.itemByPage;
        this.fetchActivitys();
    }

    fetchActivitys(): void {
        this.activityService.fetchAll(this.request);
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
            this.delete(this.activityIdForDelete);
        }
        this.activityIdForDelete = null;
    }

    showDelete(activityId?: number): void {
        this.activityIdForDelete = activityId
            ? activityId
            : this.selectedActivity.id;
    }
}
