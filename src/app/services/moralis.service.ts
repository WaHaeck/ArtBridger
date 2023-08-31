import { Injectable } from '@angular/core';
import { Moralis } from 'moralis';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { SnackbarService } from './snackbar.service';
import { HelperMethods } from '../helpers/helper';
import { Router } from '@angular/router';
import { INFTInfoDetail, INFTInfo } from '../interfaces/NFT';
import {
  IProductInfo,
  ISizeInfo,
  IShippingCountry
} from '../interfaces/Webshop';

@Injectable({
  providedIn: 'root'
})
export class MoralisService {
  private _loggedInUser: Moralis.User<Moralis.Attributes> | undefined;
  public get getLoggedInUser(): Moralis.User | undefined {
    return this._loggedInUser;
  }

  private _isUserAuthenticated = new BehaviorSubject(false);
  public get userHasUpdated$(): Observable<boolean> {
    return this._isUserAuthenticated.asObservable();
  }

  public get isAuthenticated(): boolean {
    return this._isUserAuthenticated.value;
  }
  public redirectUrl: string;

  constructor(
    private _snackBarService: SnackbarService,
    private _router: Router
  ) {
    Moralis.start({
      appId: environment.moralis.appId,
      serverUrl: environment.moralis.serverUrl
    }).then(() => console.info('Moralis has been initialised.'));
  }

  //#region  Authentication
  public login(provider: 'metamask' | 'walletconnect' = 'metamask'): void {
    (provider === 'metamask'
      ? Moralis.Web3.authenticate()
      : Moralis.Web3.authenticate({ provider })
    )
      .then(loggedInUser => {
        if (loggedInUser) {
          this._clearCache();
          this._loggedInUser = loggedInUser;
          this._isUserAuthenticated.next(true);
          this._router.navigate([this.redirectUrl || '']);
          this.redirectUrl = '';
        }
      })
      .catch(e => {
        if (e.code === 4001)
          this._snackBarService.openError(
            'Login failed: Message signature has been denied.'
          );
      });
  }

  public logout(): void {
    Moralis.User.logOut()
      // Set user to undefined
      .then(() => {
        this._clearCache();
        // So route guards get re-evaluated
        window.location.reload();
        this._isUserAuthenticated.next(false);
      })
      // Disconnect Web3 wallet
      .then(() => Moralis.Web3.cleanup())
      .catch(e => console.error('Moralis logout error:', e));
  }

  public get isLoggedIn(): boolean {
    return this._loggedInUser != undefined;
  }
  //#endregion Authentication

  //#region NFTs
  public async fetchNFTInfo(): Promise<INFTInfo[]> {
    if (this._loggedInUser == undefined) return Promise.resolve([]); //throw error or smth

    const result = await Moralis.Web3.getNFTs({
      chain: 'eth',
      address: this._loggedInUser.get('ethAddress')
    });

    if (!result) return Promise.resolve([]);

    return result
      .filter(nft => nft.token_address && nft.token_id && nft.token_uri)
      .map(nft => {
        return {
          tokenID: nft.token_id,
          uri: nft.token_uri,
          name: nft.name || '',
          ID: nft.token_address + '-' + nft.token_id
        } as INFTInfo;
      });
  }

  public async fetchNFTInfoDetail(
    nftID: string,
    uri: string
  ): Promise<INFTInfoDetail> {
    try {
      const validatedURI = HelperMethods.validateURL(uri);
      const result = await Moralis.Cloud.run('fetchNFTDetail', {
        URL: validatedURI
      });
      if (!result) {
        this._snackBarService.openError('Could not find NFT details.');
      }

      const validatedURL = HelperMethods.validateURL(result.data.image);
      const NFTItemDetail = {
        ID: nftID,
        name: result.data.name || '',
        collectionName: '',
        description: result.data.description || '',
        image: validatedURL || ''
      };
      return NFTItemDetail;
    } catch (e) {
      console.log('error thrown in fetchNFTInfodeatil: ' + e);
      throw new Error(e);
    }
  }
  //#endregion NFTs

  //#region Data
  public async getProducts(): Promise<IProductInfo[]> {
    const query = new Moralis.Query('ABProduct');
    const products = await query.find();
    return products.map(p => {
      return {
        id: p.id,
        name: p.get('name'),
        description: p.get('description'),
        image: p.get('image')
      } as IProductInfo;
    });
  }

  public async getSizes(): Promise<ISizeInfo[]> {
    const query = new Moralis.Query('ABSize');
    const sizes = await query.find();
    return sizes.map(s => {
      return {
        id: s.id,
        displayValue: s.get('widthCM') + 'cm × ' + s.get('heightCM') + 'cm',
        productId: (s.get('product') as Moralis.Object).id,
        height: s.get('heightCM'),
        width: s.get('widthCM'),
        price: s.get('priceEUR')
      } as ISizeInfo;
    });
  }

  public async getShippingCountries(): Promise<IShippingCountry[]> {
    const query = new Moralis.Query('ABCountry');
    const countries = await query.find();
    return countries.map(s => {
      return {
        name: s.get('name')
      } as IShippingCountry;
    });
  }
  //#endregion

  private _clearCache(): void {
    this._loggedInUser = undefined;
  }
}
