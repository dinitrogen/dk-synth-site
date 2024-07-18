import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    private baseHref: string = environment.baseHref;

    constructor(private http: HttpClient) {}

    preparePayment(data:any) {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
          };
        return this.http.post(this.baseHref + '/api/payment', data, httpOptions);
    }

    retrievePayment(data:any) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      return this.http.post(this.baseHref + '/api/paymentget', data, httpOptions);
    }
}