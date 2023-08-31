import { Injectable } from '@angular/core';
import { IOrderItem } from '../interfaces/Webshop';
import { MoralisService } from './moralis.service';

@Injectable({
  providedIn: 'root'
})
export class browserstorageService {
  constructor(private _moralisService: MoralisService) {}

  //#region Cart
  public getCartItems(): IOrderItem[] {
    const cart = this._getCart();

    const user = this._moralisService.getLoggedInUser;
    if (!user) return [];

    const address = user.get('ethAddress');
    const itemsForAddress = cart[address];
    if (!itemsForAddress) return [];
    return itemsForAddress;
  }

  public addCartItem(item: IOrderItem): void {
    const cart = this._getCart();
    const user = this._moralisService.getLoggedInUser;
    if (!user) return;

    const address = user.get('ethAddress');
    const itemsForAddress = cart[address];
    if (!itemsForAddress) {
      cart[address] = [item];
    } else {
      itemsForAddress.push(item);
    }
    window.localStorage.setItem('cart', JSON.stringify(cart));
  }

  public updateCartItem(item: IOrderItem): void {
    const cart = this._getCart();
    const user = this._moralisService.getLoggedInUser;
    if (!user) return;

    const address = user.get('ethAddress');
    const itemsForAddress = cart[address];
    if (!itemsForAddress) {
      return;
    } else {
      const index = itemsForAddress.findIndex(x => x.ID === item.ID);
      if (index > -1) {
        itemsForAddress[index] = item;
      }
    }
    window.localStorage.setItem('cart', JSON.stringify(cart));
  }

  public removeCartItem(item: IOrderItem): void {
    const cart = this._getCart();
    const user = this._moralisService.getLoggedInUser;
    if (!user) return;

    const address = user.get('ethAddress');
    const itemsForAddress = cart[address];
    if (!itemsForAddress) {
      return;
    } else {
      const index = itemsForAddress.findIndex(x => x.ID === item.ID);
      if (index > -1) {
        itemsForAddress.splice(index, 1);
      }
    }
    window.localStorage.setItem('cart', JSON.stringify(cart));
  }

  private _getCart(): { [address: string]: IOrderItem[] } {
    const cart = window.localStorage.getItem('cart');
    if (!cart) return {};
    return JSON.parse(cart);
  }
  //#endregion Cart
}
