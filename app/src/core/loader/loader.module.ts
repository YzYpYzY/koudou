import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader.component';
import { LoaderWrapperComponent } from './loader-wrapper.component';
import { LoadingDirective } from '../directives/loading.directive';

@NgModule({
    declarations: [LoaderComponent, LoaderWrapperComponent],
    imports: [CommonModule],
    exports: [LoaderComponent, LoaderWrapperComponent],
    providers: [LoadingDirective],
})
export class LoaderModule {}
