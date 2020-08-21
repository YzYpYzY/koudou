import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '@core/base/base.component';
import { takeUntil } from 'rxjs/operators';
import { KoudouService } from 'src/state/koudou.service';
import { Nav } from '../models/Nav';
import { ClaimTypes } from '@core/enums/ClaimTypes';

@Component({
    selector: 'koudou-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent extends BaseComponent implements OnInit {
    navigations: Nav[] = [
        {
            label: 'Actualités',
            url: '/news',
            isActive: false,
            icon: 'gg-home',
            claims: [ClaimTypes.ReadNews],
        },
        {
            label: 'Gestion news',
            url: '/news/management',
            isActive: false,
            icon: 'gg-media-podcast',
            claims: [ClaimTypes.CreateNews],
        },
        {
            label: 'Membres',
            url: '/members',
            isActive: false,
            icon: 'gg-user-list',
            claims: [ClaimTypes.ReadMember],
        },
        {
            label: 'Mailing',
            url: '/mailing',
            isActive: false,
            icon: 'gg-mail',
            claims: [ClaimTypes.ReadMailing],
        },
        {
            label: 'Sections',
            url: '/sections',
            isActive: false,
            icon: 'gg-shape-hexagon',
            claims: [ClaimTypes.ReadSection],
        },
        {
            label: 'Photos',
            url: '/photos',
            isActive: false,
            icon: 'gg-image',
            claims: [ClaimTypes.ReadPhoto],
        },
        {
            label: 'Paiements',
            url: '/payments',
            isActive: false,
            icon: 'gg-credit-card',
            claims: [ClaimTypes.ReadPayment],
        },
    ];
    filteredNavigations: Nav[] = [];
    @Output() hide = new EventEmitter();
    isDarkMode: boolean;
    activeNavUrl: string;

    constructor(private router: Router, private koudouService: KoudouService) {
        super();
    }

    ngOnInit() {
        const parts = window.location.href.split('/');

        this.activeNavUrl = parts[parts.length - 1];
        this.koudouService.isDarkMode$
            .pipe(takeUntil(this.destroy$))
            .subscribe((value) => {
                this.isDarkMode = value;
            });
        this.koudouService.user$
            .pipe(takeUntil(this.destroy$))
            .subscribe((user) => {
                if (user && user.claims) {
                    const navs = [];
                    for (const nav of this.navigations) {
                        if (nav.url === this.activeNavUrl) {
                            nav.isActive = true;
                        }
                        let missingClaim = false;
                        for (const claim of nav.claims) {
                            if (
                                user.claims.includes(ClaimTypes[claim]) ===
                                false
                            ) {
                                missingClaim = true;
                            }
                        }
                        if (missingClaim === false) {
                            navs.push({ ...nav });
                        }
                    }
                    this.filteredNavigations = navs;
                }
            });
    }

    navigate(nav: Nav): void {
        this.activeNavUrl = nav.url;
        const navs = this.filteredNavigations.map((n) => ({
            ...n,
            isActive: this.activeNavUrl === n.url,
        }));
        this.filteredNavigations = navs;
        this.hide.emit();
        this.router.navigate([nav.url]);
    }

    toggleDarkMode() {
        this.koudouService.toggleDarkMode();
    }
}
