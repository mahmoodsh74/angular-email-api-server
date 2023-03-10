import {Injectable} from '@angular/core';
import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, tap} from 'rxjs';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const modifyRequest = request.clone({
      withCredentials: true
    });
    console.log(modifyRequest);
    return next.handle(modifyRequest).pipe(
      tap((value) => {
        console.log(value);
        if (value.type === HttpEventType.Sent) {
          console.log('sent')
        }
        if (value.type === HttpEventType.Response) {
          console.log('Response')
        }
      })
    );
  }
}
