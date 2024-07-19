import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cart: any[];
  grandTotal: number = 0;
  
  constructor(private cartService: CartService) {
    this.cart = this.cartService.getItems();
  }

  ngOnInit(): void {
    this.cartService.currentGrandTotal.subscribe(total => this.grandTotal = total)
  }

  increaseQty(cartItem: any) {
    this.cartService.updateProductQty(cartItem, 1);
  }

  decreaseQty(cartItem: any) {
    this.cartService.updateProductQty(cartItem, -1);
  }

  removeFromCart(cartItem: any) {
    this.cartService.removeFromCart(cartItem);
  }


}
