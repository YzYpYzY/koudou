import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { LogoComponent } from './logo/logo.component';
import { MiscService } from './services/misc.service';

@NgModule({
    declarations: [LoaderComponent, LogoComponent],
    imports: [CommonModule],
    exports: [LoaderComponent, LogoComponent],
    providers: [MiscService],
})
export class CoreModule {}
