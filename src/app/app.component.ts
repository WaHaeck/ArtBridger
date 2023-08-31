import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lukaskraker';

  public isLoading = true;

  constructor() {}

  public async ngOnInit(): Promise<void> {}

  public onActivate(): void {
    // scroll to top of page
    window.scroll(0, 0);
  }
}
