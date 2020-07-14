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
import { ISection } from './models/ISection';
import { IListRequest } from '../../core/models/IListRequest';
import { SectionService } from './state/section.service';

@Component({
    selector: 'koudou-section',
    templateUrl: './section.component.html',
    styleUrls: ['./section.component.scss'],
})
export class SectionComponent extends BaseComponent implements OnInit {
    CrudStates = CrudStates;
    selectedSection$: Observable<ISection>;
    selectedSection: ISection;

    sections: ISection[] = [];
    sectionsCount = 0;
    columns: Column[] = [
        { name: 'Nom', attribute: 'name' },
        { name: 'Nombre de membres', attribute: 'memberCount' },
        { name: 'Section parente', attribute: 'parentSection' },
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
    sectionIdForDelete: number = null;
    question = 'Ètes-vous certains de vouloir supprimer cette section ?';
    answer = [
        { label: 'Annuler', value: false, type: AnswerType.Default },
        { label: 'Oui', value: true, type: AnswerType.Danger },
    ];
    constructor(private sectionService: SectionService) {
        super();
        this.sectionService.sections$
            .pipe(takeUntil(this.destroy$))
            .subscribe((sections) => {
                this.sections = sections;
            });
        this.sectionService.selectedSection$
            .pipe(takeUntil(this.destroy$))
            .subscribe((section) => {
                this.selectedSection = section;
            });
        this.sectionService.sectionsCount$
            .pipe(takeUntil(this.destroy$))
            .subscribe((sectionsCount) => (this.sectionsCount = sectionsCount));
        this.selectedSection$ = this.sectionService.selectedSection$;
    }

    ngOnInit() {
        this.request = {
            sort: null,
            sortDirection: null,
            startIndex: 0,
            count: this.itemByPage,
            filter: null,
        };
        this.fetchSections();
    }

    add() {
        this.select(null);
        this.state = CrudStates.Create;
    }
    cancel() {
        this.state = CrudStates.List;
    }
    select(sectionId: number) {
        this.sectionService.select(sectionId);
        this.state = CrudStates.Read;
    }
    save(section: ISection) {
        this.sectionService.save(section);
        this.state = CrudStates.Read;
    }
    update() {
        this.state = CrudStates.Update;
    }
    delete(sectionId: number): void {
        this.sectionService.delete(sectionId);
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
        this.fetchSections();
    }

    filterFormReady(form: FormGroup): void {
        form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((change) => {
            this.request.filter = change.filter;
            this.fetchSections();
        });
    }

    pageChange(newPage: number): void {
        this.request.startIndex = (newPage - 1) * this.itemByPage;
        this.fetchSections();
    }

    fetchSections(): void {
        this.sectionService.fetchAll(this.request);
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
            this.delete(this.sectionIdForDelete);
        }
        this.sectionIdForDelete = null;
    }

    showDelete(sectionId?: number): void {
        this.sectionIdForDelete = sectionId
            ? sectionId
            : this.selectedSection.id;
    }
}
