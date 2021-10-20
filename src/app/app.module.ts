import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroDialogComponent } from './components/hero-dialog/hero-dialog.component';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { ENV } from './core/constants/global.constants';
import { HeroDetailsModule } from './modules/hero-details/hero-details.module';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, DashboardComponent, HeroListComponent, UserDialogComponent, HeroDialogComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule, SharedModule, HeroDetailsModule],
  providers: [
    { provide: ENV, useValue: environment },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
