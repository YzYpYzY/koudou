import {
    Injectable,
    ComponentFactoryResolver,
    ApplicationRef,
    ComponentRef,
    Injector,
    EmbeddedViewRef,
} from '@angular/core';
import { NotificationComponent } from './notification.component';

@Injectable({
    providedIn: 'root',
})
export class NotificationDomService {
    private notifContainerElement: HTMLElement;
    private notifContainerRef: ComponentRef<NotificationComponent>;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector,
    ) {
        this.notifContainerRef = this.createComponentRef(NotificationComponent);
        this.notifContainerElement = this.getDomElementFromComponentRef(
            this.notifContainerRef,
        );
    }

    public init() {
        this.addChild(this.notifContainerElement);
    }

    private createComponentRef(component: any): ComponentRef<any> {
        const componentRef = this.componentFactoryResolver
            .resolveComponentFactory(component)
            .create(this.injector);
        this.appRef.attachView(componentRef.hostView);
        return componentRef;
    }

    private addChild(child: HTMLElement, parent: HTMLElement = document.body) {
        parent.appendChild(child);
    }

    private getDomElementFromComponentRef(
        componentRef: ComponentRef<any>,
    ): HTMLElement {
        return (componentRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;
    }
}
