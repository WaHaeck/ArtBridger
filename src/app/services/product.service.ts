import { Injectable } from '@angular/core';
import { ISizeInfo, IProductInfo } from '../interfaces/Webshop';
import { MoralisService } from './moralis.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _products: IProductInfo[];
  private _sizes: { [productId: string]: ISizeInfo[] } = {};

  constructor(private _moralisService: MoralisService) {}

  public async getSizes(productId: string): Promise<ISizeInfo[]> {
    const sizes = this._sizes[productId];
    if (!sizes) {
      const rawSizes = await this._moralisService.getSizes();
      for (const size of rawSizes) {
        if (!this._sizes[size.productId]) {
          this._sizes[size.productId] = [size];
        } else {
          this._sizes[size.productId].push(size);
        }
      }
    }
    return this._sizes[productId];
  }

  public async getProducts(): Promise<IProductInfo[]> {
    if (!this._products) {
      this._products = await this._moralisService.getProducts();
      return this._products;
    }
    return this._products;
  }

  public isProductAndSizeValid(size: ISizeInfo): boolean {
    const match = this._sizes[size.productId].find(c => c.id === size.id);
    if (!match) return false;

    // Also validate product
    return true;
  }
}
