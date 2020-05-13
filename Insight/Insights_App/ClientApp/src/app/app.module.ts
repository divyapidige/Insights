import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SampleComponent } from './sample/sample.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { PageNotFoundComponent } from './shared/components/reusable/page-not-found/page-not-found.component';
import { TokenInterceptor } from './shared/services/jwt.service';
import { ErrorHandlerService } from './shared/services/error-handler.service';


@NgModule({
  declarations: [
    AppComponent,
    SampleComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent, PageNotFoundComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: ErrorHandler, useClass: ErrorHandlerService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
