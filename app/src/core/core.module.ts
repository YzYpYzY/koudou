import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { LogoComponent } from './logo/logo.component';
import { MiscService } from './services/misc.service';
import { LoaderWrapperComponent } from './loader/loader-wrapper.component';
import { LoadingDirective } from './directives/loading.directive';
import { ClaimsDirective } from './directives/claims.directive';

@NgModule({
    declarations: [
        LoaderComponent,
        LogoComponent,
        LoaderWrapperComponent,
        LoadingDirective,
        ClaimsDirective,
    ],
    imports: [CommonModule],
    exports: [
        LoaderComponent,
        LogoComponent,
        ClaimsDirective,
        LoadingDirective,
    ],
    providers: [MiscService, LoadingDirective],
})
export class CoreModule {}
