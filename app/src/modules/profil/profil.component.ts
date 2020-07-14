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
                validators: [Validators.required],
            },
            {
                type: FieldTypes.Email,
                name: 'email',
                label: 'E-mail',
                validators: [Validators.required, Validators.email],
            },
            {
                type: FieldTypes.Password,
                name: 'password',
                label: 'Mot de passe',
                validators: [Validators.required],
            },
            {
                type: FieldTypes.Password,
                name: 'confirmPassword',
                label: 'Confirmation mot de passe',
                validators: [Validators.required],
            },
        ],
    };
    headerActions: YzYAction[] = [
        { name: 'edit', class: 'gg-pen', type: YzYActionTypes.Warning },
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

    handleHeaderActions(action: YzYAction): void {}
}
