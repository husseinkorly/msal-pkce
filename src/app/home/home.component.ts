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
    // this.authService.handleRedirect().subscribe({
    //   next: (resp) => console.log(resp)
    // }).unsubscribe();
    // if (this.authService.accountInfo) {
    //   this.username = this.authService.accountInfo.username;
    // }
    this.authService.handleRedirect();
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
