import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './profil/profil.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@core/core.module';
import { YzYFormsModule, FieldModule, LayoutModule } from 'yzy-ng';
@NgModule({
    declarations: [LoginComponent, ProfilComponent],
    imports: [
        CommonModule,
        FieldModule,
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        YzYFormsModule,
        CoreModule,
        LayoutModule,
    ],
})
export class AuthModule {}
