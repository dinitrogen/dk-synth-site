import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { EducationComponent } from './education/education.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent, title: 'Home page' },
    { path: 'shop', component: ShopComponent, title: 'Shop' },
    { path: 'learn', component: EducationComponent, title: 'Learn' },
    { path: 'contact', component: ContactComponent, title: 'Contact' },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
