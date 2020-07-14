import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './album.component';
import { AlbumRoutingModule } from './album-routing.module';
import { NgxsModule } from '@ngxs/store';
import { CoreModule } from '@core/core.module';
import { YzYFormsModule, FieldModule, TableModule, LayoutModule } from 'yzy-ng';
import { AlbumStore } from './state/album.store';

@NgModule({
    declarations: [AlbumComponent],
    imports: [
        CommonModule,
        AlbumRoutingModule,
        NgxsModule.forFeature([AlbumStore]),
        CoreModule,
        YzYFormsModule,
        FieldModule,
        TableModule,
        LayoutModule,
    ],
})
export class AlbumModule {}
