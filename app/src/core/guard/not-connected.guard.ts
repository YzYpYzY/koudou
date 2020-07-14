import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    RouterStateSnapshot,
    Router,
} from '@angular/router';
import { KoudouService } from '../../state/koudou.service';
import { take, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NotConnectedGuard implements CanActivate {
    constructor(private router: Router, private koudouService: KoudouService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.koudouService.isLogged$.pipe(
            take(1),
            map(isLogged => {
                if (!isLogged) {
                    return true;
                } else {
                    this.router.navigate(['/']);
                    return false;
                }
            })
        );
    }
}
