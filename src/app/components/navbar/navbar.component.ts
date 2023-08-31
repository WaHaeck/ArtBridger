import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { WebshopService } from 'src/app/services/webshop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  public isActive: boolean;
  public cartItemsAmount: number;

  constructor(
    private _webshopService: WebshopService,
    private _cdr: ChangeDetectorRef,
    private _router: Router
  ) {
    this._webshopService.cartHasUpdated$.subscribe(items => {
      this.cartItemsAmount = items.length;
      this._cdr.markForCheck();
    });
  }

  public handleClick(): void {
    this.isActive = !this.isActive;
    this._cdr.markForCheck();
  }

  public handleItemClick(url: string): void {
    this._router.navigate([url]);
    this.isActive = false;
    this._cdr.markForCheck();
  }
}
