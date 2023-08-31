import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

export enum ButtonType {
  PRIMARY = 'PRIMARY',
  BLUE_TRANSPARENT = 'BLUE_TRANSPARENT',
  SECUNDARY = 'SECUNDARY',
  YELLOW_TRANSPARENT = 'YELLOW_TRANSPARENT',
  LARGE_TRANSPARENT = 'LARGE_TRANSPARENT'
}

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() public text: string = '';
  @Input() public buttonType: ButtonType = ButtonType.PRIMARY;

  public ButtonType = ButtonType;

  constructor() {}

  ngOnInit(): void {}
}
