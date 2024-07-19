import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

import {register} from 'swiper/element/bundle';
import { CartService } from '../services/cart.service';

register();

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  productName: string = '';
  product: any;
  productQty: number = 1;
  addedToCart: boolean = false;
  isLoading: boolean = true;
  
  constructor(private apiService: ApiService, private cartService: CartService) {
    this.productName = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.apiService.getProductByName(this.productName).subscribe(product => {
      if (product) {
        this.product = product;
        this.isLoading = false;
      } else {
        this.router.navigate(['error']);
      }
    });
  }

  decreaseQty() {
    // get current input value field. if 1, return. else, quantity--
    if (this.productQty === 1) {
      return
    } else {
      this.productQty--;
    }
  }

  increaseQty() {
    // get current input value. if <max>, return, else qty++
    if (this.productQty === 10) {
      return
    } else {
      this.productQty++;
    }
  }

  addToCart(product: any) {
    this.cartService.addToCart(product, this.productQty);
    
    this.addedToCart = true;
  }
}
