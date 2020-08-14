import { FormModel, FieldTypes, YzYAction, YzYActionTypes } from 'yzy-ng';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IUser } from '@core/models/IUser';
import { KoudouService } from 'src/state/koudou.service';

@Component({
    selector: 'koudou-profil',
    templateUrl: './profil.component.html',
    styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
    profilForm: FormGroup;
    error$: Observable<string>;
    user$: Observable<IUser>;
    user: IUser;
    profilFormDescriptor: FormModel = {
        title: null,
        fields: [
            {
                type: FieldTypes.Text,
                name: 'pseudo',
                label: 'Pseudo',
                isReadOnly: true,
                validators: [],
            },
            {
                type: FieldTypes.Email,
                name: 'email',
                label: 'E-mail',
                isReadOnly: true,
                validators: [],
            },
        ],
    };

    changePasswordFormDescriptor: FormModel = {
        title: null,
        fields: [
            {
                type: FieldTypes.Password,
                name: 'password',
                label: 'Mot de passe',
                validators: [Validators.required],
            },
            {
                type: FieldTypes.Password,
                name: 'newPassword',
                label: 'Nouveau mot de passe',
                validators: [Validators.required],
            },
            {
                type: FieldTypes.Password,
                name: 'confirmNewPassword',
                label: 'Confirmation du nouveau mot de passe',
                validators: [Validators.required],
            },
        ],
    };
    headerActions: YzYAction[] = [
        {
            name: 'cancel',
            class: 'gg-cancel',
            type: YzYActionTypes.Default,
            hide: true,
        },
        {
            name: 'save',
            class: 'gg-save',
            type: YzYActionTypes.Success,
            hide: true,
        },
    ];
    constructor(private koudouService: KoudouService) {}

    ngOnInit() {
        this.error$ = this.koudouService.error$;
        this.koudouService.user$.subscribe((user) => {
            this.user = user;
            this.setValues();
        });
    }

    setValues() {
        if (this.profilForm && this.user) {
            this.profilForm.patchValue(this.user);
        }
    }

    setProfilForm(form: FormGroup): void {
        this.profilForm = form;
        this.setValues();
    }

    // tslint:disable-next-line: variable-name
    handleHeaderActions(_action: YzYAction): void {}

    changePasswordView() {}
}
