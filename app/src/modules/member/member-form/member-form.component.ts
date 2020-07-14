import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { CrudStates } from '@core/enums';
import { Observable } from 'rxjs';
import {
    FormModel,
    FieldTypes,
    OptionModel,
    YzYAction,
    YzYActionTypes,
    YzYFormGroup,
    Answer,
    AnswerType,
} from 'yzy-ng';
import { IMemberDetails } from '../models/IMemberDetails';

@Component({
    selector: 'koudou-member-form',
    templateUrl: './member-form.component.html',
    styleUrls: ['./member-form.component.scss'],
})
export class MemberFormComponent implements OnInit {
    @Input() member: IMemberDetails;
    @Input() error$: Observable<string[]>;
    @Input() state: CrudStates;
    @Output() save = new EventEmitter<IMemberDetails>();
    @Output() update = new EventEmitter<void>();
    @Output() delete = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();
    CrudStates = CrudStates;
    memberFormModel: FormModel;
    memberForm: YzYFormGroup;
    groupOptions: OptionModel[];
    headerActions: YzYAction[] = [];
    title = 'Membre';
    isConfirmDisplayed = false;
    confirmAnswers: Answer[] = [
        { label: 'Annuler', value: false, type: AnswerType.Default },
        { label: 'Oui', value: true, type: AnswerType.Danger },
    ];

    constructor() {}

    ngOnInit() {
        this.initForm();
        this.setValues();
    }

    initForm(): void {
        this.memberFormModel = {
            title: null,
            fields: [
                {
                    type: FieldTypes.Text,
                    name: 'lastName',
                    label: 'Nom',
                    isReadOnly: false,
                    validators: [Validators.required],
                    column: 1,
                    row: 1,
                },
                {
                    type: FieldTypes.Text,
                    name: 'firstName',
                    label: 'Prénom',
                    isReadOnly: false,
                    validators: [Validators.required],
                    column: 1,
                    row: 2,
                },
                {
                    type: FieldTypes.Date,
                    name: 'birthDate',
                    label: 'Date de naissance',
                    isReadOnly: false,
                    validators: [Validators.required],
                    column: 1,
                    row: 3,
                },
                {
                    type: FieldTypes.Dropdown,
                    name: 'sexe',
                    label: 'Sexe',
                    isReadOnly: false,
                    validators: [Validators.required],
                    column: 1,
                    row: 4,
                },
                {
                    type: FieldTypes.Dropdown,
                    name: 'famillyA',
                    label: 'Famille A',
                    isReadOnly: false,
                    validators: [Validators.required],
                    column: 1,
                    row: 5,
                },
                {
                    type: FieldTypes.Dropdown,
                    name: 'famillyB',
                    label: 'Famille B',
                    isReadOnly: false,
                    validators: [Validators.required],
                    column: 1,
                    row: 5,
                },
                {
                    type: FieldTypes.Text,
                    name: 'phone',
                    label: 'Téléphone',
                    isReadOnly: false,
                    validators: [Validators.required],
                    column: 2,
                    row: 1,
                },
                {
                    type: FieldTypes.Text,
                    name: 'way',
                    label: 'Rue',
                    isReadOnly: false,
                    validators: [Validators.required],
                    column: 2,
                    row: 2,
                },
                {
                    type: FieldTypes.Text,
                    name: 'numer',
                    label: 'Numéro',
                    isReadOnly: false,
                    validators: [Validators.required],
                    column: 2,
                    row: 3,
                },
                {
                    type: FieldTypes.Text,
                    name: 'box',
                    label: 'Boîte',
                    isReadOnly: false,
                    validators: [Validators.required],
                    column: 2,
                    row: 4,
                },
                {
                    type: FieldTypes.Text,
                    name: 'postalCode',
                    label: 'Code postal',
                    isReadOnly: false,
                    validators: [Validators.required],
                    column: 2,
                    row: 5,
                },
                {
                    type: FieldTypes.Dropdown,
                    name: 'locality',
                    label: 'Localité',
                    isReadOnly: false,
                    validators: [Validators.required],
                    column: 2,
                    row: 6,
                },
                {
                    type: FieldTypes.TextArea,
                    name: 'comentary',
                    label: 'Commentaire',
                    isReadOnly: false,
                    validators: [Validators.required],
                    column: 2,
                    row: 7,
                },
                {
                    type: FieldTypes.Text,
                    name: 'totem',
                    label: 'Totem',
                    isReadOnly: false,
                    validators: [Validators.required],
                    column: 3,
                    row: 1,
                },
                {
                    type: FieldTypes.Text,
                    name: 'quali',
                    label: 'Quali',
                    isReadOnly: false,
                    validators: [Validators.required],
                    column: 3,
                    row: 2,
                },
                {
                    type: FieldTypes.Dropdown,
                    name: 'section',
                    label: 'Section',
                    isReadOnly: false,
                    validators: [Validators.required],
                    column: 3,
                    row: 3,
                },
                {
                    type: FieldTypes.Dropdown,
                    name: 'subSection',
                    label: 'Sous-section',
                    isReadOnly: false,
                    validators: [Validators.required],
                    column: 3,
                    row: 3,
                },
                {
                    type: FieldTypes.Dropdown,
                    name: 'role',
                    label: 'Rôle',
                    isReadOnly: false,
                    validators: [Validators.required],
                    column: 3,
                    row: 4,
                },
            ],
        };
    }

    setReadOnlyTo(isReadOnly: boolean): void {
        if (isReadOnly) {
            this.title = 'Détails membre';
            this.headerActions = [
                {
                    name: 'back',
                    class: 'gg-chevron-left',
                    type: YzYActionTypes.Info,
                    label: 'Retour',
                },
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
            for (const c of Object.keys(this.memberForm.controls)) {
                this.memberForm.controls[c].disable();
            }
        } else {
            this.title = 'Créer membre';
            this.headerActions = [
                {
                    name: 'back',
                    class: 'gg-chevron-left',
                    type: YzYActionTypes.Info,
                },
                {
                    name: 'save',
                    class: 'gg-check-o',
                    type: YzYActionTypes.Success,
                },
            ];
            if (this.state !== CrudStates.Create) {
                this.title = 'Editer membre';
                this.headerActions.push({
                    name: 'delete',
                    class: 'gg-trash',
                    type: YzYActionTypes.Error,
                });
            }
            for (const c of Object.keys(this.memberForm.controls)) {
                this.memberForm.controls[c].enable();
            }
        }
    }

    setForm(form: YzYFormGroup) {
        this.memberForm = form;
        this.setValues();
        this.setReadOnlyTo(this.state === CrudStates.Read);
    }

    setValues() {
        if (this.memberForm && this.member) {
            this.memberForm.patchValue(this.member);
            if (this.state === CrudStates.Read) {
                this.setReadOnlyTo(true);
            }
        }
    }
    handleAction(action: YzYAction): void {
        switch (action.name) {
            case 'save':
                if (this.memberForm.testValidityAndDisplayErrors()) {
                    this.save.emit(this.memberForm.getTypedValue());
                    this.setReadOnlyTo(true);
                }
                break;
            case 'back':
                this.cancel.emit();
                break;
            case 'edit':
                this.setReadOnlyTo(false);
                this.update.emit();
                break;
            case 'delete':
                this.isConfirmDisplayed = true;
                break;
        }
    }
    selectAnswer(answer: Answer): void {
        if (answer.value) {
            this.isConfirmDisplayed = false;
            this.setReadOnlyTo(false);
            this.delete.emit();
        } else {
            this.isConfirmDisplayed = false;
        }
    }
}
