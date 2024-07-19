import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    cart: Array<any> = []
    
    cartQty = new BehaviorSubject(0);
    currentCartQty = this.cartQty.asObservable();

    grandTotal = new BehaviorSubject(0);
    currentGrandTotal = this.grandTotal.asObservable();

    addToCart(product: any, quantity: number) {
        let alreadyInCart: boolean = false;

        const cartItem = {
            product: product,
            quantity: quantity,
            totalPrice: product.price * quantity
        }

        this.cart.forEach(item => {
            if (item.product.name === product.name) {
                // TODO: change the alert message
                alreadyInCart = true;
                item.quantity += cartItem.quantity;
                item.totalPrice = item.product.price * item.quantity;
            }
        });
        
        if (!alreadyInCart) {
            this.cart.push(cartItem);
        }
        this.updateCartQty();
    }

    updateProductQty(cartItem: any, quantity: number) {
        this.cart.forEach(item => {

            if (item.product.name === cartItem.product.name) {
                item.quantity += quantity;

                if (item.quantity < 1) { item.quantity = 1 }

                item.totalPrice = item.product.price * item.quantity;
            }
        });
        this.updateCartQty();
    }

    getItems() {
        return this.cart;
    }

    getCartQty() {
        return this.cart.length;
    }

    updateCartQty() {
        let totalQty = 0;
        let totalCost = 0;
        
        this.cart.forEach(item => {
            totalQty += item.quantity
            totalCost += (item.product.price * item.quantity);
        });
        this.grandTotal.next(totalCost);
        this.cartQty.next(totalQty);
    }

    removeFromCart(cartItem:any) {
        this.cart.forEach((item, i) => {
            if (item.product.name === cartItem.product.name) {
                this.cart.splice(i,1);
            }
        });
        this.updateCartQty();
    }

    clearCart() {
        this.cart = [];
        return this.cart;
    }


}