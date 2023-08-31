import { Injectable } from '@angular/core';
import { INFTInfoDetail } from '../interfaces/NFT';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private _nftInfoDetailFilter: IFilter<INFTInfoDetail> | null;

  public set NFTInfoFilter(value: NFTInfoDetailFilter | null) {
    this._nftInfoDetailFilter = value;
  }

  constructor() {}

  public applyNFTInfoDetailFilter(data: INFTInfoDetail[]): INFTInfoDetail[] {
    if (!this._nftInfoDetailFilter) return data;
    return this._nftInfoDetailFilter.applyFilter(data);
  }
}

interface IFilter<T> {
  applyFilter(data: T[]): T[];
}

export class NFTInfoDetailFilter implements IFilter<INFTInfoDetail> {
  constructor(private _searchString: string) {}

  public applyFilter(data: INFTInfoDetail[]): INFTInfoDetail[] {
    const result: INFTInfoDetail[] = [];
    if (!data) return result;

    data.forEach((item: INFTInfoDetail) => {
      if (
        item.name.toLowerCase().includes(this._searchString.toLowerCase()) ||
        item.collectionName
          .toLowerCase()
          .includes(this._searchString.toLowerCase())
      ) {
        result.push(item);
      }
    });
    return result;
  }
}
