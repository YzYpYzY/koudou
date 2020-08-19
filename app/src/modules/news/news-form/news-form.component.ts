import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    SimpleChanges,
} from '@angular/core';
import {
    YzYFormGroup,
    YzYAction,
    FormModel,
    FieldTypes,
    YzYActionTypes,
} from 'yzy-ng';
import { Validators } from '@angular/forms';
import { INews } from '../models/INews';

@Component({
    selector: 'koudou-news-form',
    templateUrl: './news-form.component.html',
    styleUrls: ['./news-form.component.scss'],
})
export class NewsFormComponent implements OnInit {
    @Input() selectedNews: INews;
    @Input() isLoading: boolean;
    @Input() isReadOnly: boolean;
    @Output() save = new EventEmitter<INews>();
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
                label: 'Titre',
                name: 'title',
                type: FieldTypes.Text,
                validators: [Validators.required],
            },
            {
                label: 'Contenu',
                name: 'content',
                type: FieldTypes.TextArea,
                validators: [Validators.required],
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
        if (this.selectedNews) {
            this.form.patchValue(this.selectedNews);
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
