import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';

@Component({
  selector: 'app-instruction-card',
  templateUrl: './instruction-card.component.html',
  styleUrls: ['./instruction-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstructionCardComponent implements OnInit {
  @Input()
  public icon: string;

  @Input()
  public step: number;

  @Input()
  public title: string;

  @Input()
  public description: string;

  constructor() {}

  ngOnInit(): void {}
}
