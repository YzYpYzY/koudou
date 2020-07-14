import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { KoudouService } from 'src/state/koudou.service';
import { Observable } from 'rxjs';
import { takeWhile, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@core/base/base.component';

@Component({
    selector: 'koudou-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent extends BaseComponent implements OnInit {
    navigations = [
        {
            label: 'Actualités',
            url: 'news',
            isActive: false,
            icon: 'gg-home',
        },
        {
            label: 'Sections',
            url: 'sections',
            isActive: false,
            icon: 'gg-shape-hexagon',
        },
        {
            label: 'Membres',
            url: 'members',
            isActive: false,
            icon: 'gg-user-list',
        },
        {
            label: 'Photos',
            url: 'photos',
            isActive: false,
            icon: 'gg-image',
        },
        {
            label: 'Gestion news',
            url: 'news/management',
            isActive: false,
            icon: 'gg-media-podcast',
        },
        {
            label: 'Activités',
            url: 'activities',
            isActive: false,
            icon: 'gg-dribbble',
        },
        {
            label: 'Mailing',
            url: 'mailing',
            isActive: false,
            icon: 'gg-mail',
        },
        // {
        //     label: 'Localisation',
        //     url: 'localisation',
        //     isActive: false,
        //     icon: 'gg-pentagon-down',
        // },
        {
            label: 'Paiements',
            url: 'payments',
            isActive: false,
            icon: 'gg-credit-card',
        },
    ];

    @Output() hide = new EventEmitter();
    isDarkMode: boolean;

    constructor(private router: Router, private koudouService: KoudouService) {
        super();
    }

    ngOnInit() {
        const parts = window.location.href.split('/');
        this.selectNav(parts[parts.length - 1]);
        this.koudouService.isDarkMode$
            .pipe(takeUntil(this.destroy$))
            .subscribe((value) => {
                this.isDarkMode = value;
            });
    }

    navigate(nav): void {
        this.selectNav(nav.url);
        this.router.navigate([nav.url]);
        this.hide.emit();
    }

    selectNav(url: string): void {
        this.navigations = this.navigations.map((n) => ({
            ...n,
            isActive: n.url === url,
        }));
    }

    toggleDarkMode() {
        this.koudouService.toggleDarkMode();
    }
}
