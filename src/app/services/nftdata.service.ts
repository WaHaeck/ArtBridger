import { Injectable } from '@angular/core';
import { MoralisService } from './moralis.service';
import { FilterService } from './filter.service';
import { INFTInfo, INFTInfoDetail } from '../interfaces/NFT';

@Injectable({
  providedIn: 'root'
})
export class NFTDataService {
  // Caching
  private _getNFTInfoCache: INFTInfo[];
  private _getNFTInfoDetailCache: { [uri: string]: INFTInfoDetail } = {};

  // Mechanism to keep track of processed items
  private _filteredNFTInfoTracker: number;

  public isGetNFTInfoDetailsDepleted(start: number): boolean {
    return start >= this._getNFTInfoCache.length;
  }

  constructor(
    private _moralisService: MoralisService,
    private _filterService: FilterService
  ) {
    _moralisService.userHasUpdated$.subscribe(x => this._clearCache());
  }

  // Verify an NFT is still part of current account
  public async isNFTValid(nftDetail: INFTInfoDetail): Promise<boolean> {
    const nftInfo = await this._fetchNFTInfo();
    const match = nftInfo.find(i => i.ID === nftDetail.ID);
    if (!match) return Promise.resolve(false);

    return Promise.resolve(true);
  }

  public getInfo(nftID: string): INFTInfo {
    return this._getNFTInfoCache.filter(x => x.ID === nftID)[0];
  }

  public async getNFTInfo(
    start: number = 0,
    amount: number = 12
  ): Promise<INFTInfo[]> {
    if (start > this._getNFTInfoCache.length) return Promise.resolve([]);

    const result = await this._fetchNFTInfo();
    const page = result.slice(start, start + amount);

    return page;
  }

  public async getNFTInfoDetail(nftID: string): Promise<INFTInfoDetail> {
    const result = await this._fetchNFTInfoDetailWithValidation(nftID);
    return result;
  }

  public async getNFTInfoDetailsFiltered(
    start: number = 0,
    amount: number = 12
  ): Promise<INFTInfoDetail[]> {
    if (start === 0) this._filteredNFTInfoTracker = 0;

    let result: INFTInfoDetail[] = await this.getNFTInfoDetails(start, amount);
    this._filteredNFTInfoTracker += result.length;
    result = this._filterService.applyNFTInfoDetailFilter(result);
    while (
      !this.isGetNFTInfoDetailsDepleted(this._filteredNFTInfoTracker) &&
      result.length < amount
    ) {
      let data = await this.getNFTInfoDetails(
        this._filteredNFTInfoTracker,
        amount - result.length
      );
      this._filteredNFTInfoTracker += data.length;
      data = this._filterService.applyNFTInfoDetailFilter(data);
      result = result.concat(data);
    }
    return result;
  }

  public async getNFTInfoDetails(
    start: number = 0,
    amount: number = 12
  ): Promise<INFTInfoDetail[]> {
    const result = await this._fetchNFTInfo();
    const page = result.slice(start, start + amount);

    const details: INFTInfoDetail[] = [];
    const promises: Promise<void>[] = [];
    page.forEach(nft => {
      promises.push(
        new Promise(async (resolve, reject) => {
          try {
            let detail = await this._fetchNFTInfoDetail(nft.ID, nft.uri);
            if (detail) {
              detail.collectionName = nft.name;
              details.push(detail);
            }
            resolve();
          } catch (e) {
            resolve();
          }
        })
      );
    });
    await Promise.all(promises);
    return details;
  }

  private async _fetchNFTInfo(): Promise<INFTInfo[]> {
    if (!this._getNFTInfoCache.length) {
      const result = await this._moralisService.fetchNFTInfo();
      if (!result) return Promise.resolve([]);

      this._getNFTInfoCache = result;
      return this._getNFTInfoCache;
    } else {
      return Promise.resolve(this._getNFTInfoCache);
    }
  }

  private async _fetchNFTInfoDetail(
    nftID: string,
    uri: string
  ): Promise<INFTInfoDetail> {
    const cachedResult = this._getNFTInfoDetailCache[nftID];
    if (cachedResult != undefined) {
      return cachedResult;
    } else {
      try {
        const result = await this._moralisService.fetchNFTInfoDetail(
          nftID,
          uri
        );
        this._getNFTInfoDetailCache[nftID] = result;
        return result;
      } catch (e) {
        const result = {
          ID: nftID,
          name: '',
          description: '',
          image: '',
          error: e
        } as INFTInfoDetail;
        this._getNFTInfoDetailCache[nftID] = result;
        return Promise.resolve(result);
      }
    }
  }

  private async _fetchNFTInfoDetailWithValidation(
    nftID: string
  ): Promise<INFTInfoDetail> {
    const cachedResult = this._getNFTInfoDetailCache[nftID];
    if (cachedResult != undefined) {
      return cachedResult;
    } else {
      let nftMatch = this._getNFTInfoCache.find(nft => nft.ID === nftID);
      if (!nftMatch) {
        const result = await this._fetchNFTInfo();
        nftMatch = result.find(nft => nft.ID === nftID);
      }
      if (!nftMatch) {
        throw new Error('NFT not found.');
      }

      const result = await this._moralisService.fetchNFTInfoDetail(
        nftID,
        nftMatch.uri
      );
      this._getNFTInfoDetailCache[nftID] = result;
      return result;
    }
  }

  private _clearCache(): void {
    this._getNFTInfoCache = [];
    this._getNFTInfoDetailCache = {};
  }
}
