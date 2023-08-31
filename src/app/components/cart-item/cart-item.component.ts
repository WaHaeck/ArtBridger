import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { IOrderItem } from 'src/app/interfaces/Webshop';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemComponent implements OnInit {
  @Input()
  public cartItem: IOrderItem;

  constructor() {}

  ngOnInit(): void {}
}
