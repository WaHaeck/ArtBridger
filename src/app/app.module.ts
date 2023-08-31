import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ButtonComponent } from './components/button/button.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { ConnectComponent } from './components/connect/connect.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { GalleryCardComponent } from './components/gallery-card/gallery-card.component';
import { GalleryViewComponent } from './components/gallery-view/gallery-view.component';
import { NftDetailComponent } from './pages/nft-detail/nft-detail.component';
import { NftDetailViewComponent } from './components/nft-detail-view/nft-detail-view.component';
import { NotificationCardComponent } from './components/noftification-card/notification-card.component';
import { CanvasViewerComponent } from './components/canvas-viewer/canvas-viewer.component';
import { CartComponent } from './pages/cart/cart.component';
import { CartViewComponent } from './components/cart-view/cart-view.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { NftFilterComponent } from './components/nft-filter/nft-filter.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { InstructionsComponent } from './components/instructions/instructions.component';
import { InstructionCardComponent } from './components/instruction-card/instruction-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { ConnectContentComponent } from './components/connect/connect-content/connect-content.component';
import { ConnectOptionComponent } from './components/connect/connect-option/connect-option.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CheckoutViewComponent } from './components/checkout-view/checkout-view.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ButtonComponent,
    HomeComponent,
    AboutComponent,
    GalleryComponent,
    ConnectComponent,
    GalleryCardComponent,
    GalleryViewComponent,
    NftDetailComponent,
    NftDetailViewComponent,
    NotificationCardComponent,
    CanvasViewerComponent,
    CartComponent,
    CartViewComponent,
    CartItemComponent,
    NftFilterComponent,
    LoginComponent,
    HeaderComponent,
    InstructionsComponent,
    InstructionCardComponent,
    FooterComponent,
    ConnectContentComponent,
    ConnectOptionComponent,
    CheckoutComponent,
    CheckoutViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatBadgeModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
