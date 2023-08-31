import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostBinding
} from '@angular/core';
import { MoralisService } from 'src/app/services/moralis.service';
import { ProductService } from 'src/app/services/product.service';
import { WebshopService, OrderItem } from 'src/app/services/webshop.service';
import { Router } from '@angular/router';
import { INFTInfoDetail, INFTSpecs } from 'src/app/interfaces/NFT';
import { ISizeInfo, IProductInfo } from 'src/app/interfaces/Webshop';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-nft-detail-view',
  templateUrl: './nft-detail-view.component.html',
  styleUrls: ['./nft-detail-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NftDetailViewComponent {
  public productControl = new FormControl('', Validators.required);
  public sizeControl = new FormControl('', Validators.required);

  public sizes: ISizeInfo[];
  @HostBinding('style.--canvasHeight')
  public canvasHeight = 'unset';
  @HostBinding('style.--canvasWidth')
  public canvasWidth = 'unset';
  public nftSpecs: INFTSpecs;

  // Product
  private _selectedProduct: IProductInfo;
  public set selectedProduct(value: IProductInfo) {
    this._selectedProduct = value;
    if (value) {
      this._productService.getSizes(value.id).then(sizes => {
        this.sizes = sizes;
        this._cdr.markForCheck();
      });
      this._updateCanvasSize(this.selectedSize);
    } else {
      this.canvasHeight = 'unset';
      this.canvasWidth = 'unset';
    }
  }
  public get selectedProduct(): IProductInfo {
    return this._selectedProduct;
  }

  private _products: IProductInfo[];
  public get products(): IProductInfo[] {
    return this._products;
  }

  public isLoadingProducts = true;
  // Size
  private _selectedSize: ISizeInfo;
  public set selectedSize(value: ISizeInfo) {
    this._selectedSize = value;
    this._updateCanvasSize(value);
  }
  public get selectedSize(): ISizeInfo {
    return this._selectedSize;
  }

  private _isAuthenticated: boolean;
  public get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }
  public quantity = 1;

  // Nft
  private _info: INFTInfoDetail;
  @Input()
  public set info(value: INFTInfoDetail) {
    this._info = value;
  }
  public get info(): INFTInfoDetail {
    return this._info;
  }

  @Input()
  public isLoading: boolean;

  constructor(
    private _moralisService: MoralisService,
    private _cdr: ChangeDetectorRef,
    private _productService: ProductService,
    private _webshopService: WebshopService,
    private _router: Router
  ) {
    this._isAuthenticated = this._moralisService.isLoggedIn;
    this._moralisService.userHasUpdated$.subscribe(x => {
      this._isAuthenticated = this._moralisService.isLoggedIn;
      this._cdr.markForCheck();
    });

    // Fetch products
    this._productService.getProducts().then(products => {
      this._products = products;
      this.isLoadingProducts = false;
      this._cdr.markForCheck();
    });
  }

  public handleAddToCart(): void {
    if (!this._selectedProduct) {
      this.productControl.markAsTouched({ onlySelf: true });
      return;
    }

    if (!this._selectedSize) {
      this.sizeControl.markAsTouched({ onlySelf: true });
      return;
    }

    const cartItem = new OrderItem(
      this._info,
      this._selectedSize,
      this._selectedProduct,
      this.quantity
    );
    this._webshopService.addToCart(cartItem);
  }

  public handleCheckout(): void {
    this._router.navigate(['cart']);
  }

  public handleBackToGallery(): void {
    this._router.navigate(['gallery']);
  }

  private _updateCanvasSize(canvasInfo: ISizeInfo): void {
    if (!canvasInfo) {
      this.canvasHeight = 'unset';
      this.canvasWidth = 'unset';
      this._cdr.markForCheck();
      return;
    }

    const w = canvasInfo.width;
    const h = canvasInfo.height;
    if (w > h) {
      this.canvasWidth = '100%';
      const r = (h / w) * 100;
      this.canvasHeight = r + '%';
    } else if (w < h) {
      this.canvasHeight = '100%';
      const r = (w / h) * 100;
      this.canvasWidth = r + '%';
    } else {
      this.canvasHeight = '100%';
      this.canvasWidth = '100%';
    }
    this._cdr.markForCheck();
  }
}
