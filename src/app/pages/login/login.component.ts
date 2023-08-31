import { Component, OnInit } from '@angular/core';
import { MoralisService } from 'src/app/services/moralis.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public isAuthenticated: boolean;

  constructor(private _moralisService: MoralisService) {
    this.isAuthenticated = this._moralisService.isAuthenticated;
  }

  ngOnInit(): void {}
}
