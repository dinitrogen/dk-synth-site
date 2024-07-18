import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { EducationComponent } from './education/education.component';
import { ContactComponent } from './contact/contact.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent, title: 'Home page' },
    { path: 'shop', component: ShopComponent, title: 'Shop' },
    { path: 'product/:id', component: ProductComponent, title: 'Product details'},
    { path: 'learn', component: EducationComponent, title: 'Learn' },
    { path: 'contact', component: ContactComponent, title: 'Contact' },
    { path: 'checkout', component: CheckoutComponent, title: 'Checkout' },
    { path: 'cart', component: CartComponent, title: 'Cart'},
    { path: 'payment', component: PaymentComponent, title: 'Payment' },
    { path: 'confirm', component: ConfirmComponent, title: 'Confirm' },
    { path: 'error', component: ErrorComponent, title: 'System Error'},
    { path: '', redirectTo: '/home', pathMatch: 'full' }
    
];
