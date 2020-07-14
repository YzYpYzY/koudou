import { IFullActivity } from './../models/IFullActivity';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Validators } from '@angular/forms';
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

@Component({
    selector: 'koudou-activity-form',
    templateUrl: './activity-form.component.html',
    styleUrls: ['./activity-form.component.scss'],
})
export class ActivityFormComponent implements OnInit {
    @Input() activity: IFullActivity;
    @Input() sectionOptions: OptionModel[];
    @Input() error$: Observable<string[]>;
    @Input() state: CrudStates;
    @Output() save = new EventEmitter<IFullActivity>();
    @Output() update = new EventEmitter<void>();
    @Output() delete = new EventEmitter<number>();
    @Output() cancel = new EventEmitter<void>();
    CrudStates = CrudStates;
    activityFormModel: FormModel;
    activityForm: YzYFormGroup;
    headerActions: YzYAction[] = [];
    title = 'Activité';

    constructor() {}

    ngOnInit() {
        this.initForm();
        this.setValues();
    }

    initForm(): void {
        this.activityFormModel = {
            title: null,
            fields: [
                {
                    type: FieldTypes.Number,
                    name: 'id',
                    label: 'Id',
                    isReadOnly: true,
                    isHide: true,
                    validators: [],
                },
                {
                    type: FieldTypes.Text,
                    name: 'name',
                    label: 'Nom',
                    isReadOnly: false,
                    validators: [Validators.required],
                },
                {
                    type: FieldTypes.Date,
                    name: 'date',
                    label: 'Date',
                    isReadOnly: false,
                    validators: [Validators.required],
                },
                {
                    type: FieldTypes.Dropdown,
                    name: 'sectionId',
                    label: 'Section',
                    isReadOnly: false,
                    options: this.sectionOptions,
                    validators: [Validators.required],
                },
                {
                    type: FieldTypes.TextArea,
                    name: 'description',
                    label: 'Description',
                    isReadOnly: false,
                    validators: [],
                },
            ],
        };
    }

    setReadOnlyTo(isReadOnly: boolean): void {
        if (isReadOnly) {
            this.title = 'Détails activité';
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
            for (const c of Object.keys(this.activityForm.controls)) {
                this.activityForm.controls[c].disable();
            }
        } else {
            this.title = 'Créer activité';
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
                this.title = 'Éditer membre';
                this.headerActions.push({
                    name: 'delete',
                    class: 'gg-trash',
                    type: YzYActionTypes.Error,
                });
            }
            for (const c of Object.keys(this.activityForm.controls)) {
                this.activityForm.controls[c].enable();
            }
        }
    }

    setForm(form: YzYFormGroup) {
        this.activityForm = form;
        this.setValues();
        this.setReadOnlyTo(this.state === CrudStates.Read);
    }

    setValues() {
        if (this.activityForm && this.activity) {
            this.activityForm.patchValue(this.activity);
            if (this.state === CrudStates.Read) {
                this.setReadOnlyTo(true);
            }
        }
    }
    handleAction(action: YzYAction): void {
        switch (action.name) {
            case 'save':
                if (this.activityForm.testValidityAndDisplayErrors()) {
                    this.save.emit(this.activityForm.getTypedValue());
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
                this.delete.emit();
                break;
        }
    }
}
