import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {}

  public openWarning(message: string, action: string = 'close'): void {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    config.panelClass = 'warning-snackbar';
    this._openSnackBar(message, action, config);
  }

  public openError(message: string, action: string = 'close'): void {
    const config = new MatSnackBarConfig();
    config.duration = 500000;
    config.panelClass = 'error-snackbar';
    this._openSnackBar(message, action, config);
  }

  public openSucces(message: string, action: string = 'close'): void {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    config.panelClass = 'succes-snackbar';
    this._openSnackBar(message, action, config);
  }

  private _openSnackBar(
    message: string,
    action: string,
    config: MatSnackBarConfig
  ): void {
    this._snackBar.open(message, action, config);
  }
}
