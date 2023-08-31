import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConnectDialogData } from '../connect.component';
import { MoralisService } from 'src/app/services/moralis.service';

@Component({
  selector: 'app-connect-content',
  templateUrl: './connect-content.component.html',
  styleUrls: ['./connect-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectContentComponent implements OnInit {
  private _network: string;
  public get network(): string {
    return this._network;
  }

  constructor(
    private _dialogRef: MatDialogRef<ConnectContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConnectDialogData,
    private _moralisService: MoralisService
  ) {
    this._network = data.network;
  }

  public handleLoginClick(provider: 'metamask' | 'walletconnect'): void {
    this._moralisService.login(provider);
    this._dialogRef.close();
  }

  public handleClose(): void {
    this._dialogRef.close();
  }

  ngOnInit(): void { }
}
