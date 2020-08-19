import { MemberService } from './state/member.service';
import { Component, OnInit } from '@angular/core';
import { CrudStates } from '@core/enums/CrudStates';
import {
    YzYSort,
    Column,
    FormModel,
    FieldTypes,
    YzYAction,
    YzYActionTypes,
    AnswerType,
    Answer,
    YzYActionEvent,
} from 'yzy-ng';
import { FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IListRequest } from '@core/models/IListRequest';
import { BaseComponent } from '@core/base/base.component';
import { IMemberDetails } from './models/IMemberDetails';
import { IMember } from './models/IMember';
@Component({
    selector: 'koudou-member',
    templateUrl: './member.component.html',
    styleUrls: ['./member.component.scss'],
})
export class MemberComponent extends BaseComponent implements OnInit {
    CrudStates = CrudStates;
    selectedMember$: Observable<IMemberDetails>;
    selectedMember: IMemberDetails;
    members: IMember[] = [];
    membersCount = 0;
    columns: Column[] = [
        { name: 'Nom', attribute: 'lastName' },
        { name: 'Prénom', attribute: 'firstName' },
        { name: 'Section', attribute: 'section' },
        { name: 'Rôle', attribute: 'role' },
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
    memberIdForDelete: number;
    question = 'Ètes-vous certains de vouloir supprimer ce membre ?';
    answer = [
        { label: 'Annuler', value: false, type: AnswerType.Default },
        { label: 'Oui', value: true, type: AnswerType.Danger },
    ];

    constructor(private memberService: MemberService) {
        super();
        this.memberService.members$
            .pipe(takeUntil(this.destroy$))
            .subscribe((members) => {
                this.members = members;
            });
        this.memberService.membersCount$
            .pipe(takeUntil(this.destroy$))
            .subscribe((membersCount) => (this.membersCount = membersCount));
        this.memberService.state$
            .pipe(takeUntil(this.destroy$))
            .subscribe((newState: CrudStates) => {
                this.state = newState;
                console.log(newState);
            });
        this.memberService.selectedMember$
            .pipe(takeUntil(this.destroy$))
            .subscribe((selectedMember) => {
                this.selectedMember = selectedMember;
            });
        this.loading$ = this.memberService.loading$;
    }

    ngOnInit() {
        this.request = {
            sort: null,
            sortDirection: null,
            startIndex: 0,
            count: 20,
            filter: null,
        };
        this.fetchMembers();
    }

    add() {
        this.memberService.setState(CrudStates.Create);
    }
    cancel() {
        this.memberService.setState(CrudStates.List);
    }
    select(memberId: number, isReadOnly: boolean) {
        this.memberService.select(memberId, isReadOnly);
    }
    save(member: IMemberDetails) {
        this.memberService.save(member);
    }
    update() {
        this.memberService.setState(CrudStates.Update);
    }
    delete(newsId: number): void {
        this.memberService.delete(newsId);
    }

    sort(memberSort: YzYSort): void {
        if (memberSort == null) {
            this.request.sort = null;
            this.request.sortDirection = null;
        } else {
            this.request.sort =
                memberSort.attribute.charAt(0).toUpperCase() +
                memberSort.attribute.slice(1);
            this.request.sortDirection = !memberSort.isDesc ? 1 : 0;
        }
        this.fetchMembers();
    }

    filterFormReady(form: FormGroup): void {
        form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((change) => {
            this.request.filter = change.filter;
            this.fetchMembers();
        });
    }

    pageChange(newPage: number): void {
        this.request.startIndex = (newPage - 1) * this.itemByPage;
        this.fetchMembers();
    }

    fetchMembers(): void {
        this.memberService.fetchAll(this.request);
    }

    handleHeaderAction(action: YzYAction): void {
        if (action.name === 'add') {
            this.add();
        }
    }
    handleFormActions(action: YzYAction): void {
        switch (action.name) {
            case 'read':
                this.select(this.selectedMember.id, true);
                break;
            case 'edit':
                this.select(this.selectedMember.id, false);
                this.update();
                break;
            case 'delete':
                this.showDelete(this.selectedMember.id);
                break;
            case 'cancel':
                this.cancel();
                break;
        }
    }
    handleLineActions({ action, key }: YzYActionEvent): void {
        switch (action.name) {
            case 'read':
                this.select(key as number, true);
                break;
            case 'edit':
                this.select(key as number, false);
                this.update();
                break;
            case 'delete':
                this.showDelete(key as number);
                break;
        }
    }

    confirmDelete(answer: Answer): void {
        if (answer.value) {
            this.delete(this.memberIdForDelete);
        }
        this.memberIdForDelete = null;
    }

    showDelete(memberId?: number): void {
        this.memberIdForDelete = memberId ? memberId : this.selectedMember.id;
    }
}
