import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { injectStripe, StripeElementsDirective, StripePaymentElementComponent, StripeAddressComponent } from 'ngx-stripe';
import { StripeElementsOptions, StripePaymentElementOptions, StripeAddressElementOptions } from '@stripe/stripe-js';
import { PaymentService } from '../services/payment.service';
import { environment } from '../../environments/environment';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';

const stripeKey = environment.stripeKey || '';


@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ StripeElementsDirective, StripePaymentElementComponent, StripeAddressComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  @ViewChild(StripePaymentElementComponent) paymentElement!: StripePaymentElementComponent;
  @ViewChild('shippingAddress') shippingAddress!: StripeAddressComponent;
  
  private baseHref: string = environment.clientBaseHref;

  router: Router = inject(Router);

  private readonly fb = inject(UntypedFormBuilder);
  private readonly paymentService = inject(PaymentService);

  amount: number = 0;
  private paymentIntent: any;

  paymentElementForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    address: ['', [Validators.required]],
    zipcode: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    amount: [2500, [Validators.required, Validators.pattern(/\d+/)]]
  });

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
    appearance: {
      theme: 'night'
    }
  };

  shippingAddressOptions: StripeAddressElementOptions = {
    mode: 'shipping'
  };

  billingAddressOptions: StripeAddressElementOptions = {
    mode: 'billing'
  };

  paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: 'tabs',
      defaultCollapsed: false,
      radios: false,
      spacedAccordionItems: false
    }
  };

  stripe = injectStripe(stripeKey);
  paying = signal(false);

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.currentGrandTotal.subscribe(total => this.amount = total);
    
    if (!this.amount) {
      this.router.navigate(['error']);
    }
    
    this.paymentService.preparePayment({amount: this.amount}).subscribe((res: any) => {
      this.paymentIntent = res.paymentIntent;
      this.elementsOptions.clientSecret = res.paymentIntent.client_secret as string;
    })
  }

  async pay() {
    const result = await this.shippingAddress.getValue();
    const{ complete, isNewAddress, value } = result;
    
    if (this.paying() || !complete) return;
    this.paying.set(true);
    
    const { email } = this.paymentElementForm.getRawValue();
    const { name, address } = value;
    
    this.stripe
      .confirmPayment({
        elements: this.paymentElement.elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: name as string,
              email: email as string,
              address: {
                line1: address.line1 as string,
                postal_code: address.postal_code as string,
                city: address.city as string
              }
            }
          },
          return_url: this.baseHref + '/confirm'
        },
        redirect: 'if_required'
      })
      .subscribe(result => {
        this.paying.set(false);
        // console.log('Result', result);
        if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
          alert('Oops!' + result.error.message);
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            // Show a success message to your customer
            window.location.href = this.baseHref + "/confirm?paymentId=" + this.paymentIntent.id
          }
        }
      });
  }

}
