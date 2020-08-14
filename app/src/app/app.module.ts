import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OtherModule } from '../modules/other/other.module';
import { SidebarModule } from 'src/modules/sidebar/sidebar.module';
import { CoreModule } from 'src/core/core.module';
import { RootGuard } from 'src/core/guard/root.guard';
import {
    HttpClientModule,
    HttpClient,
    HTTP_INTERCEPTORS,
} from '@angular/common/http';
import {
    TranslateModule,
    TranslateLoader,
    TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { KoudouStore } from '../state/koudou.store';
import { KoudouService } from 'src/state/koudou.service';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { NotConnectedGuard } from '@core/guard/not-connected.guard';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DropdownOptionsComponent } from 'yzy-ng';
@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SidebarModule,
        OtherModule,
        CoreModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        NgxsModule.forRoot([KoudouStore], {
            developmentMode: !environment.production,
        }),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        NgxsRouterPluginModule.forRoot(),
        NgxsStoragePluginModule.forRoot({
            key: 'koudou',
        }),
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
        }),
    ],
    providers: [
        RootGuard,
        NotConnectedGuard,
        KoudouService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true,
        },
        {
            provide: 'YzYTranslateService',
            useExisting: TranslateService,
        },
    ],
    bootstrap: [AppComponent],
    entryComponents: [DropdownOptionsComponent],
})
export class AppModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
