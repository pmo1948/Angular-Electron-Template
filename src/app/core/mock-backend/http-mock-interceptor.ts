import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { selectHandler } from './mock.config';

@Injectable()
export class HttpMockApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const mockEndpointHandler = selectHandler(req);
    return mockEndpointHandler ? mockEndpointHandler(req) : next.handle(req);
  }
}
