import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private baseHref: string = environment.baseHref;
    
    constructor(private http: HttpClient) {
    }

    getMessage() {
        return this.http.get(this.baseHref + '/api/message');
    }

    getProducts() {
        return this.http.get(this.baseHref + '/products');
    }

    getProductByName(name: string) {
        return this.http.get(this.baseHref + '/product/' + name);
    }

    sendSignupEmail(name: any, email: any) {
        const req = {
            name: name, email: email
        }
        return this.http.post(this.baseHref + '/signup', req);
    }

    sendContactEmail(name: any, email: any, message: any) {
        const req = {
            name: name, email: email, message: message
        }
        return this.http.post(this.baseHref + '/contact', req);
    }
}