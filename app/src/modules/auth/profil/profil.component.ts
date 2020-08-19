import {
    FormModel,
    FieldTypes,
    YzYAction,
    YzYActionTypes,
    YzYFormGroup,
} from 'yzy-ng';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IUser } from '@core/models/IUser';
import { KoudouService } from 'src/state/koudou.service';
import { Password } from '@core/validators/password.validator';
import { MustMatchNewPassword } from '@core/validators/must-match-new-password.validator';
import { ProfilState } from '../enum/ProfilState';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@core/base/base.component';
@Component({
    selector: 'koudou-profil',
    templateUrl: './profil.component.html',
    styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent extends BaseComponent implements OnInit {
    ProfilState = ProfilState;
    profilForm: YzYFormGroup;
    changePasswordForm: YzYFormGroup;
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
    loading$: Observable<boolean>;
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
                validators: [Validators.required, Password],
            },
            {
                type: FieldTypes.Password,
                name: 'confirmNewPassword',
                label: 'Confirmation du nouveau mot de passe',
                validators: [Validators.required, MustMatchNewPassword],
            },
        ],
    };
    headerActions: YzYAction[] = [
        {
            name: 'cancel',
            class: 'gg-chevron-left',
            type: YzYActionTypes.Default,
            hide: true,
        },
        {
            name: 'save',
            class: 'gg-check',
            type: YzYActionTypes.Success,
            hide: true,
        },
    ];
    state: ProfilState = ProfilState.Profil;
    constructor(private koudouService: KoudouService) {
        super();
        this.koudouService.setProfilState(ProfilState.Profil);
    }

    ngOnInit() {
        this.koudouService.user$
            .pipe(takeUntil(this.destroy$))
            .subscribe((user) => {
                this.user = user;
                this.setValues();
            });
        this.koudouService.profilState$
            .pipe(takeUntil(this.destroy$))
            .subscribe((state) => {
                this.changeView(state);
            });
        this.loading$ = this.koudouService.loading$;
    }

    setValues() {
        if (this.profilForm && this.user) {
            this.profilForm.patchValue(this.user);
        }
    }

    setProfilForm(form: YzYFormGroup): void {
        this.profilForm = form;
        this.setValues();
    }

    setChangePasswordForm(form: YzYFormGroup): void {
        this.changePasswordForm = form;
    }

    handleHeaderActions(action: YzYAction): void {
        switch (action.name) {
            case 'save':
                if (this.changePasswordForm.testValidityAndDisplayErrors()) {
                    this.koudouService.changePassword(
                        this.changePasswordForm.getTypedValue(),
                    );
                }
                break;
            case 'cancel':
                this.changeView(ProfilState.Profil);
                break;
        }
    }

    goToChangePassword() {
        this.koudouService.setProfilState(ProfilState.ChangePassword);
    }

    changeView(newState: ProfilState) {
        this.state = newState;
        this.headerActions = this.headerActions.map((a) => ({
            ...a,
            hide: this.state == ProfilState.Profil,
        }));
    }
}
