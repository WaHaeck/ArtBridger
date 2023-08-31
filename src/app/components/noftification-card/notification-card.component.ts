import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-noftification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss']
})
export class NotificationCardComponent implements OnInit {
  @Input()
  public title: string;

  @Input()
  public description: string;

  @Input()
  public showConnect: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
