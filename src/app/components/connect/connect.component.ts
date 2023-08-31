import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { MoralisService } from 'src/app/services/moralis.service';
import Moralis from 'moralis/types';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConnectContentComponent } from './connect-content/connect-content.component';

export interface ConnectDialogData {
  network: 'ethereum';
}

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectComponent {
  public labelText: string = '';
  public isUserLoggedIn: boolean = false;

  constructor(
    public dialog: MatDialog,
    private _moralisService: MoralisService,
    private _cdr: ChangeDetectorRef
  ) {
    this._moralisService.userHasUpdated$.subscribe(x => {
      this._updateUser();
      this._cdr.markForCheck();
    });

    const user = this._moralisService.getLoggedInUser;
    this._parseUserInfo(user);
  }

  public handleLoginClick(): void {
    if (!this._moralisService.isLoggedIn) {
      this.dialog.open(ConnectContentComponent, {
        data: {
          network: 'ethereum'
        }
      });
      this._cdr.markForCheck();
    }
  }

  public handleLogoutClick(): void {
    if (this._moralisService.isLoggedIn) {
      this._moralisService.logout();
    }
  }

  public handleProfileClick(): void { }

  private _updateUser(): void {
    const user = this._moralisService.getLoggedInUser;
    this._parseUserInfo(user);
  }

  private _parseUserInfo(user: Moralis.User | undefined): void {
    if (user) {
      this.isUserLoggedIn = true;
      const text = user.get('ethAddress');
      if (text != undefined) {
        const sText = text as string;
        this.labelText =
          sText.substring(0, 6) + '...' + sText.substring(sText.length - 4);
      } else {
        this.labelText = 'Error';
      }
    } else {
      this.isUserLoggedIn = false;
      this.labelText = 'Connect wallet';
    }
  }
}
