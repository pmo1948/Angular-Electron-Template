import { HttpRequest, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

const bodyless = (request: HttpRequest<any>) => {
  return of(
    new HttpResponse({
      status: 200,
      body: {}
    })
  );
};

// add responses here

export const selectHandler = (request: HttpRequest<any>) => {
  if (request.url.includes('config.json')) {
    return null;
  }
  const url = new URL(request.url)?.pathname;
  // add other paths to mock here
  if (url.includes('/send-action')) {
    return bodyless;
  }
  return null;
};
