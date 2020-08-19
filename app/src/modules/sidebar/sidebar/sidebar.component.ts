import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '@core/base/base.component';
import { takeUntil } from 'rxjs/operators';
import { KoudouService } from 'src/state/koudou.service';
import { Nav } from '../models/Nav';

@Component({
    selector: 'koudou-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent extends BaseComponent implements OnInit {
    navigations: Nav[] = [
        {
            label: 'Actualités',
            url: 'news',
            isActive: false,
            icon: 'gg-home',
        },
        {
            label: 'Gestion news',
            url: 'news/management',
            isActive: false,
            icon: 'gg-media-podcast',
        },
        {
            label: 'Membres',
            url: 'members',
            isActive: false,
            icon: 'gg-user-list',
        },
        {
            label: 'Mailing',
            url: 'mailing',
            isActive: false,
            icon: 'gg-mail',
        },
        {
            label: 'Sections',
            url: 'sections',
            isActive: false,
            icon: 'gg-shape-hexagon',
        },
        {
            label: 'Photos',
            url: 'photos',
            isActive: false,
            icon: 'gg-image',
        },
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

    navigate(nav: Nav): void {
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
