import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';
import { KoudouService } from 'src/state/koudou.service';

@Directive({ selector: '[claims]' })
export class ClaimsDirective {
    constructor(
        private viewContainer: ViewContainerRef,
        private templateRef: TemplateRef<any>,
        private koudouService: KoudouService,
    ) {}

    @Input() public set claims(value: string[]) {
        if (!!this.viewContainer) {
            if (this.koudouService.checkAccess(value)) {
                this.viewContainer.createEmbeddedView(this.templateRef);
            } else {
                this.viewContainer.clear();
            }
        }
    }
}
