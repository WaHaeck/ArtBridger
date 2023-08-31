import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { INFTInfoDetail } from 'src/app/interfaces/NFT';

@Component({
  selector: 'app-gallery-card',
  templateUrl: './gallery-card.component.html',
  styleUrls: ['./gallery-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryCardComponent implements OnInit {
  public isLoading = false;

  @Input()
  public info: INFTInfoDetail;

  constructor() {}

  ngOnInit(): void {}
}
