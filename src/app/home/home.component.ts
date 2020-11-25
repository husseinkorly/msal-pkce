import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'msal-pkce';
  username = '';
  accesstoken = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.accountInfo) {
      this.username = this.authService.accountInfo.username;
    }
  }

  acquireAccessToken(): void {
    this.authService.acquireToken()
    .then((resp: any) => {
      this.accesstoken = resp.accessToken;
    });
    // await this.authService.acquireToken();
    // this.accesstoken = this.authService.accessToken;

    // return this.accesstoken;
  }
}
