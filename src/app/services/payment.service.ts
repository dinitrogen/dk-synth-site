import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    constructor(private http: HttpClient) {}

    preparePayment(data:any) {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
          };
        return this.http.post('http://localhost:3000/api/payment', data, httpOptions);
    }

    retrievePayment(data:any) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      return this.http.post('http://localhost:3000/api/paymentget', data, httpOptions);
    }
}