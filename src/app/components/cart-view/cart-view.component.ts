import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { WebshopService } from 'src/app/services/webshop.service';
import { Router } from '@angular/router';
import { IOrderItem } from 'src/app/interfaces/Webshop';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartViewComponent implements OnInit {
  public displayedColumns = [
    '',
    'product',
    'size',
    'price',
    'amount',
    'subtotal',
    ''
  ];

  private _cartItems: IOrderItem[] = [];

  public get cartItems(): IOrderItem[] {
    return this._cartItems;
    //return this._mockedCartItems;
  }

  public get totalCartValue(): number {
    let sum = 0;
    this._cartItems.map(i => (sum += i.quantity * i.size.price));
    return sum;
  }

  constructor(
    private _webshopService: WebshopService,
    private _cdr: ChangeDetectorRef,
    private _router: Router
  ) {
    this._webshopService.cartHasUpdated$.subscribe(items => {
      this._cartItems = items;
      this._cdr.markForCheck();
    });
  }

  ngOnInit(): void {}

  public handleGalleryClick(): void {
    this._router.navigate(['/gallery']);
  }

  public handleRemoveFromCart(item: IOrderItem): void {
    this._webshopService.removeFromCart(item);
  }

  public handleGoToDetails(item: IOrderItem): void {
    this._router.navigate(['/nft', item.nft.ID]);
  }

  public handleCheckoutClick(): void {
    this._router.navigate(['/checkout']);
  }
}
