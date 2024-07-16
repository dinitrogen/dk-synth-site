import { Component, OnInit, inject } from '@angular/core';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent implements OnInit {
  
  public paymentIntent: any;

  private paymentId: string = '';
  
  private readonly paymentService = inject(PaymentService);

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    this.paymentId = urlParams.get('paymentId') as string;

    this.paymentService.retrievePayment({paymentId: this.paymentId}).subscribe((res: any) => {
      this.paymentIntent = res.paymentIntent;
      console.log(this.paymentIntent);
    });
  }
}
