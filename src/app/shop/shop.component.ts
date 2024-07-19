import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgFor } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [NgFor, RouterLink, RouterOutlet],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {
  isLoading:boolean = true;
  
  pageName: String = 'Shop';

  products: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {

    this.apiService.getProducts().subscribe(data => {
      this.products = data;
      this.isLoading = false;
    });
    
  }
}
