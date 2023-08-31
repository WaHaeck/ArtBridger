import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  HostListener
} from '@angular/core';
import { MoralisService } from 'src/app/services/moralis.service';
import { Router } from '@angular/router';
import { NFTDataService } from 'src/app/services/nftdata.service';
import { INFTInfoDetail } from 'src/app/interfaces/NFT';

@Component({
  selector: 'app-gallery-view',
  templateUrl: './gallery-view.component.html',
  styleUrls: ['./gallery-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryViewComponent implements OnInit {
  private _fetchTracker = 0;
  private _isAuthenticated = false;
  private _isLoading: boolean;
  public get isLoading(): boolean {
    return this._isLoading;
  }

  private _nfts: INFTInfoDetail[] = [];
  public get nfts(): INFTInfoDetail[] {
    return this._nfts;
  }

  constructor(
    private _moralisService: MoralisService,
    private _router: Router,
    private _cdr: ChangeDetectorRef,
    private _nftDataService: NFTDataService
  ) {
    this._moralisService.userHasUpdated$.subscribe(isAuthenticated => {
      this._clearCache();
      this._isAuthenticated = isAuthenticated;
      this._fetchNFTs();
      this._cdr.markForCheck();
    });
  }

  public handleClick(nftID: string): void {
    this._router.navigate(['/nft', nftID]);
  }

  private _fetchNFTs(filtered: boolean = false): void {
    if (!this._isAuthenticated) return;
    this._isLoading = true;
    this._cdr.markForCheck();

    const fetchPromise = filtered
      ? this._nftDataService.getNFTInfoDetailsFiltered(this._fetchTracker, 15)
      : this._nftDataService.getNFTInfoDetails(this._fetchTracker, 15);

    fetchPromise
      .then(result => {
        if (!result) return;

        // Filter out all items that throw an error on fetch
        this._nfts = this._nfts.concat(result.filter(detail => !detail.error));
        this._fetchTracker += result.length;
        this._isLoading = false;
        this._cdr.markForCheck();
      })
      .catch(e => {
        // handle error
        this._isLoading = false;
        this._cdr.markForCheck();
      });
  }

  @HostListener('window:scroll', [])
  public onScroll(): void {
    const pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      document.documentElement.offsetHeight;
    const max =
      document.documentElement.scrollHeight - window.screen.height / 2;
    if (
      !this._nftDataService.isGetNFTInfoDetailsDepleted(this._fetchTracker) &&
      pos >= max &&
      !this._isLoading
    ) {
      this._fetchNFTs();
    }
  }

  ngOnInit(): void {}

  public handleFilterChangedEvent(): void {
    this._clearCache();
    this._fetchNFTs(true);
  }

  private _clearCache(): void {
    this._fetchTracker = 0;
    this._nfts = [];
  }
}
