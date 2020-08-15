import { NotificationService } from '@core/notification/notification.service';
import { NotificationTypes } from './../../../core/enums/NotificationTypes';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseComponent } from '@core/base/base.component';
import { Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { IRegister } from 'src/modules/auth/models/IRegister';
import { KoudouService } from 'src/state/koudou.service';
import { FieldTypes, FormModel, YzYFormGroup } from 'yzy-ng';
import { LoginStateTypes } from '../enum/LoginStateTypes';
import { ILogin } from '../models/ILogin';
import { MustMatchPassword } from '@core/validators/must-match-password.validator';
import { Password } from '@core/validators/password.validator';

@Component({
    selector: 'koudou-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnInit {
    LoginStateTypes = LoginStateTypes;
    loginForm: YzYFormGroup;
    registerForm: YzYFormGroup;
    state = LoginStateTypes.Login;
    loading$: Observable<boolean>;
    loginFormModel: FormModel = {
        title: 'Connexion',
        fields: [
            {
                type: FieldTypes.Text,
                name: 'pseudo',
                label: 'Pseudo',
                validators: [Validators.required],
            },
            {
                type: FieldTypes.Password,
                name: 'password',
                label: 'Mot de passe',
                validators: [Validators.required],
            },
        ],
    };
    registerFormModel: FormModel = {
        title: 'Inscription',
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
                validators: [Validators.required, Password],
            },
            {
                type: FieldTypes.Password,
                name: 'confirmPassword',
                label: 'Confirmation mot de passe',
                validators: [Validators.required, MustMatchPassword],
            },
        ],
    };
    isDarkMode: boolean;

    constructor(
        private koudouService: KoudouService,
        private notificationService: NotificationService,
    ) {
        super();
    }

    ngOnInit() {
        this.loading$ = this.koudouService.loading$;
        this.koudouService.error$
            .pipe(
                takeUntil(this.destroy$),
                tap((error) => {
                    this.notificationService.notify({
                        message: error.message,
                        type: NotificationTypes.Error,
                    });
                }),
            )
            .subscribe();
        this.koudouService.isDarkMode$
            .pipe(takeUntil(this.destroy$))
            .subscribe((value) => {
                this.isDarkMode = value;
            });
    }

    changeState(newState: LoginStateTypes) {
        this.state = newState;
    }

    setLoginForm(form: YzYFormGroup): void {
        this.loginForm = form;
    }
    setRegisterForm(form: YzYFormGroup): void {
        this.registerForm = form;
    }

    login() {
        if (this.loginForm.testValidityAndDisplayErrors()) {
            const login = this.loginForm.getTypedValue() as ILogin;
            this.koudouService.login(login);
        }
    }

    register() {
        if (this.registerForm.testValidityAndDisplayErrors()) {
            const register = this.registerForm.getTypedValue() as IRegister;
            this.koudouService.register(register);
        }
    }

    toggleDarkMode() {
        this.koudouService.toggleDarkMode();
    }
}
