import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-canvas-viewer',
  templateUrl: './canvas-viewer.component.html',
  styleUrls: ['./canvas-viewer.component.scss']
})
export class CanvasViewerComponent implements OnInit {
  @HostBinding('style.--backgroundCanvas')
  public backgroundCanvas: string;
  @HostBinding('style.--backgroundAfter')
  public backgroundAfter: string = '#fff';
  @HostBinding('style.--backgroundBefore')
  public backgroundBefore: string = '#fff';

  private _url: string;
  @Input()
  public set url(value: string) {
    this.backgroundCanvas = `#fff url(${value})`;
    this.backgroundAfter = `#fff url(${value}) top right -10px`;
    this.backgroundBefore = `#fff url(${value}) top -10px left`;
    this._url = value;
  }
  public get url(): string {
    return this._url;
  }

  @HostBinding('style.--imageWidth')
  @Input()
  public width: string;

  @HostBinding('style.--imageHeight')
  @Input()
  public height: string;

  constructor() {}

  ngOnInit(): void {}
}
