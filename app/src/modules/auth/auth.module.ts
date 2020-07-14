import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@core/core.module';
import { YzYFormsModule, FieldModule } from 'yzy-ng';
@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        FieldModule,
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        YzYFormsModule,
        CoreModule,
    ],
})
export class AuthModule {}
