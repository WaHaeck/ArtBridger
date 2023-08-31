import { Injectable } from '@angular/core';
import { MoralisService } from './moralis.service';
import { IShippingCountry } from '../interfaces/Webshop';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  private _shippingCountries: IShippingCountry[];

  constructor(private _moralisService: MoralisService) {}

  public async getShippingCountries(): Promise<IShippingCountry[]> {
    if (!this._shippingCountries) {
      this._shippingCountries = await this._moralisService.getShippingCountries();
      this._shippingCountries.sort((a, b) => a.name.localeCompare(b.name));
    }
    return this._shippingCountries;
  }
}
