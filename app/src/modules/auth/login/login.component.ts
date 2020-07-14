import { IRegister } from 'src/modules/auth/models/IRegister';
import { BaseComponent } from '@core/base/base.component';
import { FormModel, FieldTypes, YzYFormGroup } from 'yzy-ng';
import { Component, OnInit } from '@angular/core';
import {
    FormControl,
    FormBuilder,
    Validators,
    FormGroup,
} from '@angular/forms';
import { LoginStateTypes } from '../enum/LoginStateTypes';
import { ILogin } from '../models/ILogin';
import { KoudouService } from 'src/state/koudou.service';
import { Observable, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
    error$: Observable<string>;
    isLoading = false;
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
    isDarkMode: boolean;

    constructor(private fb: FormBuilder, private koudouService: KoudouService) {
        super();
    }

    ngOnInit() {
        this.error$ = this.koudouService.error$;
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
            this.isLoading = true;
            this.koudouService.login(login);
        }
    }

    register() {
        if (this.registerForm.testValidityAndDisplayErrors()) {
            const register = this.registerForm.getTypedValue() as IRegister;
            this.isLoading = true;
            this.koudouService.register(register);
        }
    }

    toggleDarkMode() {
        this.koudouService.toggleDarkMode();
    }
}
