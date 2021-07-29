import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { ConfigurationService } from './core/configuration/configuration.service';
import { HttpMockApiInterceptor } from './core/mock-backend/http-mock-interceptor';

export function initializeApp(appConfig: ConfigurationService): () => Promise<void> {
  return () => appConfig.load();
}

const isMock = environment.mock;

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigurationService],
      multi: true
    },
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
