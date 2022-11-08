import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SpinnerService } from "@app/components/spinner/services/spinner.service";
import { finalize, Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class WeatherInterceptor implements HttpInterceptor {
  constructor(private spinner: SpinnerService){}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    this.spinner.show();
    const cloneReq = req.clone({
      params: req.params.appendAll({
        "units": "metric",
        "appid": environment.openWeather.key,
      }),
    });
    return next.handle(cloneReq).pipe(finalize(() => this.spinner.hide()));
  }
}
