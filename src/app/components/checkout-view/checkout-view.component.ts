import {
  Component,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';
import { WebshopService } from 'src/app/services/webshop.service';
import {
  IOrderItem,
  IShippingInfo,
  IShippingCountry
} from 'src/app/interfaces/Webshop';
import { ShippingService } from 'src/app/services/shipping.service';

@Component({
  selector: 'app-checkout-view',
  templateUrl: './checkout-view.component.html',
  styleUrls: ['./checkout-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutViewComponent {
  public form: FormGroup;
  public selectedCountry: string;

  private _cartItems: IOrderItem[];
  public get cartItems(): IOrderItem[] {
    return this._cartItems;
  }

  public get totalCartValue(): number {
    return this._webshopService.totalCartValue;
  }

  private _error: string;
  public get error(): string {
    return this._error;
  }

  private _shippingCountries: IShippingCountry[];
  public get shippingCountries(): IShippingCountry[] {
    return this._shippingCountries;
  }

  constructor(
    private _router: Router,
    private _webshopService: WebshopService,
    private _cdr: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private _shippingService: ShippingService
  ) {
    this._webshopService.cartHasUpdated$.subscribe(items => {
      this._cartItems = items;
      this._cdr.markForCheck();
    });

    this._shippingService.getShippingCountries().then(countries => {
      this._shippingCountries = countries;
      this._cdr.markForCheck();
      // error handling
    });

    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address1: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      postcode: ['', Validators.required],
      country: ['', Validators.required],
      state: ['']
    });
  }

  public handleBackToCartClick(): void {
    this._router.navigate(['/cart']);
  }

  public isFieldValid(field: string): boolean {
    const fField = this.form.get(field);
    if (!fField) return false;
    return fField.valid && fField.touched;
  }

  public handlePlaceOrderClick(): void {
    if (!this.form) return;

    if (!this._validateAllFormFields(this.form)) return;
    const shippingInfo = this._extractShippingInfo(this.form);
    this._webshopService.shippingInfo = shippingInfo;
    this._webshopService.placeOrder();
  }

  private _validateAllFormFields(formGroup: FormGroup): boolean {
    let issues = false;
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
        if (control.invalid) {
          issues = true;
        }
      } else if (control instanceof FormGroup) {
        this._validateAllFormFields(control);
      }
    });
    return !issues;

    // Validate terms and condition checkbox
  }

  private _extractShippingInfo(form: FormGroup): IShippingInfo {
    const firstName = form.controls['firstName'].value;
    const lastName = form.controls['lastName'].value;
    const email = form.controls['email'].value;
    const address1 = form.controls['address1'].value;
    const address2 = form.controls['address2'].value;
    const city = form.controls['city'].value;
    const postcode = form.controls['postcode'].value;
    const state = form.controls['state'].value;
    const country = this.selectedCountry;

    return {
      firstName: firstName,
      lastName: lastName,
      email: email,
      address1: address1,
      address2: address2,
      city: city,
      postcode: postcode,
      state: state,
      country: country
    };
  }
}
