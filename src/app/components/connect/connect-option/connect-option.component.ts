import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';

@Component({
  selector: 'app-connect-option',
  templateUrl: './connect-option.component.html',
  styleUrls: ['./connect-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectOptionComponent implements OnInit {
  @Input()
  public option: 'walletconnect' | 'metamask';

  constructor() {}

  ngOnInit(): void {}
}
