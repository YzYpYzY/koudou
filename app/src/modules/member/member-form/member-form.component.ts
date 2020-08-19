import {
    Component,
    OnInit,
    EventEmitter,
    Output,
    Input,
    SimpleChanges,
    OnChanges,
} from '@angular/core';
import { Validators } from '@angular/forms';
import {
    FormModel,
    FieldTypes,
    YzYAction,
    YzYActionTypes,
    YzYFormGroup,
} from 'yzy-ng';
import { IMemberDetails } from '../models/IMemberDetails';

@Component({
    selector: 'koudou-member-form',
    templateUrl: './member-form.component.html',
    styleUrls: ['./member-form.component.scss'],
})
export class MemberFormComponent implements OnInit, OnChanges {
    @Input() selectedMember: IMemberDetails;
    @Input() isLoading: boolean;
    @Input() isReadOnly: boolean;
    @Output() save: EventEmitter<IMemberDetails> = new EventEmitter<
        IMemberDetails
    >();
    @Output() action: EventEmitter<YzYAction> = new EventEmitter<YzYAction>();
    form: YzYFormGroup;
    constructor() {}

    formModel: FormModel = {
        title: null,
        fields: [
            {
                label: '',
                name: 'id',
                type: FieldTypes.Number,
                isHide: true,
            },
            {
                label: '',
                name: 'rowVersion',
                type: FieldTypes.Number,
                isHide: true,
            },
            {
                label: 'Nom',
                name: 'lastName',
                type: FieldTypes.Text,
                validators: [Validators.required],
            },
            {
                label: 'Prénom',
                name: 'firstName',
                type: FieldTypes.Text,
                validators: [Validators.required],
            },
            {
                label: 'Date de naissance',
                name: 'birthdate',
                type: FieldTypes.Date,
                dateOptions: {
                    separator: '/',
                    format: 'eu',
                    displayFormat: 'eu',
                    isReset: false,
                },
                validators: [],
            },
            {
                label: 'Sexe',
                name: 'sex',
                type: FieldTypes.Dropdown,
                options: [
                    { label: 'Femme', value: 'F' },
                    { label: 'Homme', value: 'M' },
                    { label: 'Inconnu', value: 'U' },
                ],
                validators: [],
            },
            {
                label: 'Remarque',
                name: 'comment',
                type: FieldTypes.TextArea,
                validators: [],
            },
        ],
    };
    headerActions: YzYAction[] = [
        {
            name: 'cancel',
            class: 'gg-chevron-left',
            type: YzYActionTypes.Default,
        },
        { name: 'save', class: 'gg-check', type: YzYActionTypes.Success },
        {
            name: 'edit',
            class: 'gg-pen',
            type: YzYActionTypes.Warning,
        },
        {
            name: 'delete',
            class: 'gg-trash',
            type: YzYActionTypes.Error,
        },
    ];
    ngOnInit(): void {
        this.initForm();
    }
    ngOnChanges(_changes: SimpleChanges): void {
        this.initForm();
    }

    initForm(): void {
        const actions = [...this.headerActions];
        if (this.isReadOnly) {
            actions[1].hide = true;
            actions[2].hide = false;
            actions[3].hide = false;
        } else {
            actions[1].hide = false;
            actions[2].hide = true;
            actions[3].hide = true;
        }
        this.headerActions = actions;
        this.formModel = {
            ...this.formModel,
            fields: this.formModel.fields.map((f) => ({
                ...f,
                isReadOnly: this.isReadOnly,
            })),
        };
    }
    formReady(form: YzYFormGroup): void {
        this.form = form;
        if (this.selectedMember) {
            this.form.patchValue(this.selectedMember);
        }
    }

    handleHeaderAction(action: YzYAction): void {
        switch (action.name) {
            case 'save':
                if (this.form.testValidityAndDisplayErrors()) {
                    this.save.emit(this.form.getTypedValue());
                }
                break;
            default:
                this.action.emit(action);
                break;
        }
    }
}
