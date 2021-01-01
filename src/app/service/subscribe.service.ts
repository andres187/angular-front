import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {

  constructor(private HttpClient: HttpClient) { }

  paymentUrl = environment.api_server + 'payment/';

  public save(): Observable<any> {
    return this.HttpClient.post<any>(this.paymentUrl, "");
  }
}
