import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

import {register} from 'swiper/element/bundle';

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
  addedToCart: boolean = false;
  
  constructor(private apiService: ApiService) {
    this.productName = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.apiService.getProductByName(this.productName).subscribe(product => {
      if (product) {
        this.product = product;
      } else {
        this.router.navigate(['error']);
      }
    });
  }


  addToCart() {
    this.addedToCart = true;
  }
}
