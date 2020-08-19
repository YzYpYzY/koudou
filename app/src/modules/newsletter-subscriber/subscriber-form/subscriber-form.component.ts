import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import {
    FormModel,
    FieldTypes,
    YzYActionTypes,
    YzYAction,
    YzYFormGroup,
} from 'yzy-ng';
import { NewsletterSubscriber } from '../models/INewsletterSubscriber';
import { Validators } from '@angular/forms';

@Component({
    selector: 'koudou-subscriber-form',
    templateUrl: './subscriber-form.component.html',
    styleUrls: ['./subscriber-form.component.scss'],
})
export class SubscriberFormComponent implements OnInit, OnChanges {
    @Input() selectedSubscriber: NewsletterSubscriber;
    @Input() isLoading: boolean;
    @Input() isReadOnly: boolean;
    @Output() save = new EventEmitter<NewsletterSubscriber>();
    @Output() action = new EventEmitter<YzYAction>();
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
                name: 'name',
                type: FieldTypes.Text,
                validators: [Validators.required],
            },
            {
                label: 'Email',
                name: 'email',
                type: FieldTypes.Email,
                validators: [Validators.required, Validators.email],
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
        if (this.selectedSubscriber) {
            this.form.setValue(this.selectedSubscriber);
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
