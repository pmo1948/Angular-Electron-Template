import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from './app.config';
import defaultData from '../../../assets/config/config.dev.json';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  config: AppConfig;

  constructor(private http: HttpClient) {}

  load(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http
        .get('./config.json') // todo : replace path with consul
        .toPromise()
        .then((response: AppConfig) => {
          this.config = response;
          resolve();
        })
        .catch((error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.config = defaultData as AppConfig;
            console.warn('Loading default dev configuration', defaultData); // todo: replace with Logger.LogWarning
            resolve();
          } else {
            console.error('Could not load file. Error: ', error); // todo: replace with Logger.LogError
            reject(`Could not load file. :${JSON.stringify(error)}`);
          }
        });
    });
  }
}
