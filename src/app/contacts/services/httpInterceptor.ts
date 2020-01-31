import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class ContactInterceptorService implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.indexOf('login') === -1) {
            req = req.clone({ setHeaders: { 'Authorization': 'MY_SECRET_ENCRYPTED_TOKEN' } });
        }
        return next.handle(req).pipe(tap((event: HttpEvent<any>) => { },
            (err: any) => {
            }));
    }
}
