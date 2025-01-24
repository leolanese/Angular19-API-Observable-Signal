import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const headers = new HttpHeaders().set('AuthToken', 'This worked');
  const newReq = req.clone({ headers });
  return next(newReq);
};