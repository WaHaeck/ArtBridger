import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { AboutComponent } from './pages/about/about.component';
import { NftDetailComponent } from './pages/nft-detail/nft-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'gallery',
    component: GalleryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'nft/:id',
    component: NftDetailComponent
    //canActivate: [AuthGuard]
  },
  {
    path: 'cart',
    component: CartComponent
    //canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
    //canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
