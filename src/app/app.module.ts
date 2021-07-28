import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { HttpMockApiInterceptor } from './core/mock-backend/http-mock-interceptor';

const isMock = environment.mock;

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [
    isMock
      ? {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpMockApiInterceptor,
          multi: true
        }
      : []
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
