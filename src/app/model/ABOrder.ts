import { Moralis } from 'moralis';
import {
  IOrderedProduct,
  IPaymentInfo,
  IShippingInfo
} from '../interfaces/Webshop';

export class ABOrder extends Moralis.Object {
  constructor() {
    super('ABOrder');
    this.set('status', 'pending');
  }

  public setProducts(products: IOrderedProduct): void {
    this.set('products', products);
  }

  public setPaymentInfo(paymentInfo: IPaymentInfo): void {
    this.set('paymentInfo', paymentInfo);
  }

  public setShippingInfo(shippingInfo: IShippingInfo): void {
    this.set('shippingInfo', shippingInfo);
  }
}
