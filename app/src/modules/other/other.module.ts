import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { CoreModule } from '@core/core.module';

@NgModule({
    declarations: [HomeComponent, ErrorComponent],
    imports: [CommonModule, CoreModule],
})
export class OtherModule {}
