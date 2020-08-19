import {
    Directive,
    Input,
    ViewContainerRef,
    TemplateRef,
    ComponentFactoryResolver,
    ComponentFactory,
    ComponentRef,
} from '@angular/core';
import { LoaderWrapperComponent } from '../loader/loader-wrapper.component';

@Directive({ selector: '[loading]' })
export class LoadingDirective {
    @Input() set loading(loading: boolean) {
        if (loading) {
            this.loaderWrapperComponent = this.vcr.createComponent(
                this.cmpFactory,
            );
        } else {
            if (this.loaderWrapperComponent) {
                this.loaderWrapperComponent.destroy();
            }
        }
    }
    loaderWrapperComponent: ComponentRef<LoaderWrapperComponent>;
    cmpFactory: ComponentFactory<LoaderWrapperComponent>;
    constructor(
        private templateRef: TemplateRef<void>,
        private vcr: ViewContainerRef,
        private cfr: ComponentFactoryResolver,
    ) {
        this.vcr.createEmbeddedView(this.templateRef);
        this.cmpFactory = this.cfr.resolveComponentFactory(
            LoaderWrapperComponent,
        );
    }
}
