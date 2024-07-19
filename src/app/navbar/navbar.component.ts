import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  
  currentCartQty: number = 0;

  constructor(private cartService: CartService){  
  }

  ngOnInit(): void {
    this.cartService.currentCartQty.subscribe(qty => this.currentCartQty = qty)
  }

  closeMenu() {
    const elem = document.activeElement as HTMLElement;
      if(elem) {
        elem?.blur();
      }
  }

}
