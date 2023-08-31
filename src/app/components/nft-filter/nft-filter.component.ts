import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import {
  FilterService,
  NFTInfoDetailFilter
} from 'src/app/services/filter.service';

@Component({
  selector: 'app-nft-filter',
  templateUrl: './nft-filter.component.html',
  styleUrls: ['./nft-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NftFilterComponent implements OnInit {
  public searchString: string;

  @Output()
  public filterChanged = new EventEmitter<void>();

  constructor(private _filterService: FilterService) {}

  ngOnInit(): void {}

  public handleSearch(): void {
    this._filterService.NFTInfoFilter = new NFTInfoDetailFilter(
      this.searchString
    );
    this.filterChanged.emit();
  }

  public handleClear(): void {
    this.searchString = '';
    this._filterService.NFTInfoFilter = null;
    this.filterChanged.emit();
  }
}
