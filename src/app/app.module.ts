import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { AuthModule } from "./auth/auth.module";
import { CoreModule } from "./core/core.module";
import { HeaderComponent } from "./core/components/header/header.component";
import { SearchInterceptor } from "./youtube/services/search.interceptor";
import { SearchService } from "./youtube/services/search.service";

@NgModule({
    declarations: [AppComponent, HeaderComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        AuthModule,
        CoreModule,
        HttpClientModule
    ],
    exports: [],
    providers: [
        SearchService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SearchInterceptor,
            multi: true
        }],
    bootstrap: [AppComponent],
})
export class AppModule {}
