import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './profil/profil.component';
import { NotConnectedGuard } from '@core/guard/not-connected.guard';
import { RootGuard } from '@core/guard/root.guard';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NotConnectedGuard],
    },
    { path: 'profil', component: ProfilComponent, canActivate: [RootGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
