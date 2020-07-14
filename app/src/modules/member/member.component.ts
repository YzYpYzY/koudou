import { FormGroup } from '@angular/forms';
import { BaseComponent } from '@core/base/base.component';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { MemberService } from './state/member.service';
import { IMember } from './models/IMember';
import { CrudStates } from '@core/enums';
import { IMemberDetails } from './models/IMemberDetails';
import {
    Column,
    FormModel,
    FieldTypes,
    YzYAction,
    YzYActionTypes,
    YzYSort,
    ColumnTypes,
} from 'yzy-ng';
import { IListRequest } from '@core/models/IListRequest';
import { Observable, combineLatest } from 'rxjs';

@Component({
    selector: 'koudou-member',
    templateUrl: './member.component.html',
    styleUrls: ['./member.component.scss'],
})
export class MemberComponent extends BaseComponent implements OnInit {
    CrudStates = CrudStates;
    selectedMember$: Observable<IMemberDetails>;
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
    valuesForForm = null;
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
        this.selectedMember$ = this.memberService.selectedMember$;
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
        this.select(null);
        this.state = CrudStates.Create;
    }
    cancel() {
        this.state = CrudStates.List;
    }
    select(memberId: number) {
        this.memberService.select(memberId);
        this.state = CrudStates.Read;
    }
    save(member: IMemberDetails) {
        this.memberService.save(member);
        this.state = CrudStates.Read;
    }
    update() {
        this.state = CrudStates.Update;
    }
    delete(memberId: number): void {
        this.memberService.delete(memberId);
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
}
