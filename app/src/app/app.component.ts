import { BaseComponent } from '@core/base/base.component';
import { Component, HostBinding } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { KoudouService } from 'src/state/koudou.service';
import { tap, takeUntil } from 'rxjs/operators';
import { NotificationDomService } from '@core/notification/notification.module';
import { IUser } from '../core/models/IUser';

@Component({
    selector: 'koudou-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent {
    @HostBinding('class.dark') darkMode = false;
    @HostBinding('class.s-desktop') screenSize = true;
    title = 'koudou';
    isLogged$: Observable<boolean>;
    isNavDisplayed = true;
    user$: Observable<IUser>;
    constructor(
        translate: TranslateService,
        private koudouService: KoudouService,
        private notificationDomService: NotificationDomService,
    ) {
        super();
        this.notificationDomService.init();
        translate.setDefaultLang('fr');
        this.isLogged$ = this.koudouService.isLogged$;
        this.koudouService.isDarkMode$
            .pipe(
                takeUntil(this.destroy$),
                tap((value) => {
                    setTimeout(() => {
                        this.darkMode = value;
                    });
                }),
            )
            .subscribe();
        this.user$ = this.koudouService.user$;
    }

    toggleNavDisplay() {
        this.isNavDisplayed = !this.isNavDisplayed;
    }
    hideNav() {
        this.isNavDisplayed = false;
    }
    logout(): void {
        this.koudouService.logout();
    }
    navigateToProfil(): void {
        this.koudouService.navigate(['auth/profil']);
    }
}
