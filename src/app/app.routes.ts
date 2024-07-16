import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { EducationComponent } from './education/education.component';
import { ContactComponent } from './contact/contact.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent, title: 'Home page' },
    { path: 'shop', component: ShopComponent, title: 'Shop' },
    { path: 'learn', component: EducationComponent, title: 'Learn' },
    { path: 'contact', component: ContactComponent, title: 'Contact' },
    { path: 'checkout', component: CheckoutComponent, title: 'Checkout' },
    { path: 'cart', component: CartComponent, title: 'Cart'},
    { path: 'payment', component: PaymentComponent, title: 'Payment' },
    { path: 'confirm', component: ConfirmComponent, title: 'Confirm' },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
