import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../services/payment.service';

import { StripeElementsOptions } from '@stripe/stripe-js';
import { injectStripe, StripeElementsDirective, StripePaymentElementComponent, StripeService } from 'ngx-stripe';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [StripeElementsDirective, StripePaymentElementComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  constructor(private http: HttpClient, private stripeService: StripeService) {}

checkout() {
  this.http.post('http://localhost:3000/create-checkout-session', {})
    .pipe(
      switchMap((session: any) => {
        return this.stripeService.redirectToCheckout({ sessionId: session.id })
      })
    )
    .subscribe(result => {
      if (result.error) {
        alert(result.error.message);
      }
    })
}


}
