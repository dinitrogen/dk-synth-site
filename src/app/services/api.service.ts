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
}