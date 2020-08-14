import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from '../modules/other/error/error.component';
import { HomeComponent } from '../modules/other/home/home.component';
import { RootGuard } from '@core/guard/root.guard';
import { NotConnectedGuard } from '@core/guard/not-connected.guard';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [RootGuard] },
    {
        path: 'profil',
        loadChildren: () =>
            import('../modules/profil/profil.module').then(
                (m) => m.ProfilModule,
            ),
        canActivate: [RootGuard],
    },
    {
        path: 'members',
        loadChildren: () =>
            import('../modules/member/member.module').then(
                (m) => m.MemberModule,
            ),
        canActivate: [RootGuard],
    },
    {
        path: 'mailing',
        loadChildren: () =>
            import(
                '../modules/newsletter-subscriber/newsletter-subscriber.module'
            ).then((m) => m.NewsletterSubscriberModule),
        canActivate: [RootGuard],
    },
    {
        path: 'sections',
        loadChildren: () =>
            import('../modules/section/section.module').then(
                (m) => m.SectionModule,
            ),
        canActivate: [RootGuard],
    },
    {
        path: 'photos',
        loadChildren: () =>
            import('../modules/album/album.module').then((m) => m.AlbumModule),
        canActivate: [RootGuard],
    },
    {
        path: 'news',
        loadChildren: () =>
            import('../modules/news/news.module').then((m) => m.NewsModule),
        canActivate: [RootGuard],
    },
    {
        path: 'activities',
        loadChildren: () =>
            import('../modules/activity/activity.module').then(
                (m) => m.ActivityModule,
            ),
        canActivate: [RootGuard],
    },
    {
        path: 'payments',
        loadChildren: () =>
            import('../modules/payment/payment.module').then(
                (m) => m.PaymentModule,
            ),
        canActivate: [RootGuard],
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('../modules/auth/auth.module').then((m) => m.AuthModule),
        canActivate: [NotConnectedGuard],
    },
    {
        path: '**',
        component: ErrorComponent,
        data: { message: '404' },
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
