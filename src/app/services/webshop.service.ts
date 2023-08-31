import { Injectable } from '@angular/core';
import { MoralisService } from './moralis.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { SnackbarService } from './snackbar.service';
import { INFTInfoDetail } from '../interfaces/NFT';
import {
  IOrderItem,
  ISizeInfo,
  IShippingInfo,
  IOrderedProduct,
  IProductInfo
} from '../interfaces/Webshop';
import { browserstorageService } from './browserstorage.service';
import { NFTDataService } from './nftdata.service';
import { ProductService } from './product.service';
import { ABOrder } from '../model/ABOrder';
import { Moralis } from 'moralis';

export class OrderItem implements IOrderItem {
  public ID: string;

  constructor(
    public nft: INFTInfoDetail,
    public size: ISizeInfo,
    public product: IProductInfo,
    public quantity: number
  ) {
    if (!nft) throw new Error('Invalid NFT');
    if (!product) throw new Error('Invalid product');
    if (!size) throw new Error('Invalid size');

    this.ID = `${this.nft.ID}-${this.product.id}-${this.size.id}`;
  }
}

@Injectable({
  providedIn: 'root'
})
export class WebshopService {
  private _cartItems: IOrderItem[] = [];
  private _cartItemsSubject = new BehaviorSubject(this._cartItems);
  public get cartHasUpdated$(): Observable<IOrderItem[]> {
    return this._cartItemsSubject.asObservable();
  }

  private _shippingInfo: IShippingInfo | null;
  public set shippingInfo(value: IShippingInfo) {
    this._shippingInfo = value;
  }

  constructor(
    private _moralisService: MoralisService,
    private _snackbarService: SnackbarService,
    private _browserstorageService: browserstorageService,
    private _nftDataService: NFTDataService,
    private _productService: ProductService
  ) {
    this._moralisService.userHasUpdated$.subscribe(isAuthenticated => {
      this._clearCache();
      if (isAuthenticated) this._initializeCartFrombrowserstorage();
    });

    this._cartItems = this._mockedCartItems;
    this._cartItemsSubject.next(this._cartItems);
  }

  //#region Cart
  public addToCart(item: IOrderItem): void {
    let snackBarMessage = '';
    const match = this._cartItems.find(x => x.ID === item.ID);
    if (match) {
      match.quantity += item.quantity;
      this._browserstorageService.updateCartItem(match);
      snackBarMessage = 'Product updated in cart.';
    } else {
      this._cartItems.push(item);
      this._browserstorageService.addCartItem(item);
      snackBarMessage = 'Product added to cart.';
    }
    this._cartItemsSubject.next(this._cartItems);
    this._snackbarService.openSucces(snackBarMessage);
  }

  public removeFromCart(item: IOrderItem): void {
    const index = this._cartItems.findIndex(x => x.ID === item.ID);
    if (index < 0) {
      // Could not find cart item
      return;
    }
    this._cartItems.splice(index, 1);
    this._browserstorageService.removeCartItem(item);
    this._cartItemsSubject.next(this._cartItems);
    this._snackbarService.openSucces('Product removed from cart.');
  }

  public get totalCartValue(): number {
    let sum = 0;
    this._cartItems.map(i => (sum += i.quantity * i.size.price));
    return sum;
  }
  //#endregion Cart

  //#region Order
  public placeOrder(): void {
    if (!this._moralisService.getLoggedInUser) return;

    const order = new ABOrder();

    // ACL
    const postACL = new Moralis.ACL();
    postACL.setReadAccess(this._moralisService.getLoggedInUser, true);
    postACL.setRoleWriteAccess('admins', true);
    postACL.setRoleReadAccess('admins', true);
    order.setACL(postACL);

    // retrieve data from current cart
    const orderedProducts: IOrderedProduct[] = [];
    for (let cartItem of this._cartItems) {
      orderedProducts.push({
        ppu: cartItem.size.price,
        product: cartItem.product.id,
        quantity: cartItem.quantity,
        size: cartItem.size.id,
        totalPrice: 100
      });
    }
    order.setProducts({
      ppu: 1,
      quantity: 1,
      product: '1',
      size: '1',
      totalPrice: 1
    });

    if (!this._shippingInfo) return;
    order.setShippingInfo(this._shippingInfo);

    // retrieve payment info
    order.setPaymentInfo({ status: 'pending' });

    order
      .save()
      .then((order: ABOrder) => {
        this._snackbarService.openSucces('Your order was succesfully placed.');
      })
      .catch(() => {
        this._snackbarService.openError(
          'Something went wrong while saving your order.'
        );
      });
  }
  //#endregion

  private _initializeCartFrombrowserstorage(): void {
    const cartItems = this._browserstorageService.getCartItems();

    // Validate cartItems if they still apply to current user
    this._cartItems = cartItems.filter(
      item =>
        this._nftDataService.isNFTValid(item.nft) &&
        this._productService.isProductAndSizeValid(item.size)
    );
    this._cartItemsSubject.next(this._cartItems);
  }

  private _clearCache(): void {
    this._cartItems = [];
    this._shippingInfo = null;
    this._cartItemsSubject.next([]);
  }

  private _mockedCartItems: IOrderItem[] = [
    {
      ID: 'ORDER ID',
      nft: {
        ID: 'NFT ID',
        collectionName: 'collection',
        description: 'The nft description',
        image:
          'https://ipfs.moralis.io:2053/ipfs/QmdEFetRqWtgk14qauyAYShNGYNtr1BR1Tc6NKcwvmCMfA',
        name: 'NFT Name'
      },
      size: {
        id: '1',
        productId: '2',
        displayValue: '20cm x 20cm',
        width: 20,
        height: 20,
        price: 50
      },
      product: {
        id: 'ProductID',
        description: '',
        image: '',
        name: 'foam canvas'
      },
      quantity: 2
    },
    {
      ID: 'ORDER ID',
      nft: {
        ID: 'NFT ID',
        collectionName: 'collection',
        description: 'The nft description',
        image:
          'https://ipfs.moralis.io:2053/ipfs/QmdEFetRqWtgk14qauyAYShNGYNtr1BR1Tc6NKcwvmCMfA',
        name: 'NFT Name'
      },
      size: {
        id: '1',
        productId: '2',
        displayValue: '20cm x 20cm',
        width: 20,
        height: 20,
        price: 50
      },
      product: {
        id: 'ProductID',
        description: '',
        image: '',
        name: 'foam canvas'
      },
      quantity: 2
    },
    {
      ID: 'ORDER ID',
      nft: {
        ID: 'NFT ID',
        collectionName: 'collection',
        description: 'The nft description',
        image:
          'https://ipfs.moralis.io:2053/ipfs/QmdEFetRqWtgk14qauyAYShNGYNtr1BR1Tc6NKcwvmCMfA',
        name: 'NFT Name'
      },
      size: {
        id: '1',
        productId: '2',
        displayValue: '20cm x 20cm',
        width: 20,
        height: 20,
        price: 50
      },
      product: {
        id: 'ProductID',
        description: '',
        image: '',
        name: 'foam canvas'
      },
      quantity: 2
    }
  ];
}
