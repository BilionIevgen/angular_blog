import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import enLocale from '@angular/common/locales/en';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { PostComponent } from './shared/components/post/post.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { SharedModule } from './shared/shared.module';
import { AuthInterseptor } from './shared/auth.interseptor';
import { environment } from '../environments/environment';


registerLocaleData(enLocale,'en')

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    PostPageComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: AuthInterseptor
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
