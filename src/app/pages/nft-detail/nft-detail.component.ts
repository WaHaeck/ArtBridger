import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoralisService } from 'src/app/services/moralis.service';
import { NFTDataService } from 'src/app/services/nftdata.service';
import { INFTInfoDetail } from 'src/app/interfaces/NFT';

@Component({
  selector: 'app-nft-detail',
  templateUrl: './nft-detail.component.html',
  styleUrls: ['./nft-detail.component.scss']
})
export class NftDetailComponent implements OnInit {
  private _id: string;
  private _isLoading: boolean;
  public get isLoading() {
    return this._isLoading;
  }

  private _isAuthenticated: boolean;
  public get isAuthenticated() {
    return this._isAuthenticated;
  }
  public info: INFTInfoDetail;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _moralisService: MoralisService,
    private _nftDataService: NFTDataService,
    private _router: Router
  ) {
    this._activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) {
        this._router.navigate(['']);
      } else {
        this._id = id;
      }
      this._fetchNFTDetail();
    });

    this._moralisService.userHasUpdated$.subscribe(x => this._fetchNFTDetail());
  }

  private _fetchNFTDetail() {
    this._isAuthenticated = this._moralisService.isLoggedIn;
    if (!this._isAuthenticated) return;

    this._isLoading = true;
    this._nftDataService
      .getNFTInfoDetail(this._id)
      .then(nft => {
        //this.info = nft;
        this._isLoading = false;
      })
      .catch(e => {
        // handle error display ittttt
        this._isLoading = false;
      });
  }

  ngOnInit(): void { }
}
