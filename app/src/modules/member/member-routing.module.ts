import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberComponent } from './member.component';
import { MemberFormComponent } from './member-form/member-form.component';

const routes: Routes = [
    { path: '', component: MemberComponent },
    { path: 'add', component: MemberFormComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MemberRoutingModule {}
