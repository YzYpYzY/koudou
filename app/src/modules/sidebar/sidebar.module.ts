import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CoreModule } from '@core/core.module';

@NgModule({
    declarations: [SidebarComponent],
    imports: [CommonModule, CoreModule],
    exports: [SidebarComponent],
})
export class SidebarModule {}
