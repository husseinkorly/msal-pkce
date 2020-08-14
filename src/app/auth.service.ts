import { Injectable } from '@angular/core';
import * as msal from '@azure/msal-browser';
import { environment } from 'src/environments/environment';

const msalConfig = environment.msal_config;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private msalInstance: msal.PublicClientApplication;
  accountInfo: msal.AccountInfo;
  accessToken: string;

  constructor() {
    this.msalInstance = new msal.PublicClientApplication(msalConfig);
    this.accountInfo = null;
    this.accessToken = '';
  }

  login(): void {
    let loginRequest = {
      scopes: [],
    };
    try {
      //this.msalInstance.loginRedirect({} as msal.RedirectRequest);
      this.msalInstance.loginPopup();
    } catch (err) {}
  }

  getAccounts(): msal.AccountInfo[] {
    return this.msalInstance.getAllAccounts();
  }

  handleRedirect(): void {
    this.msalInstance
      .handleRedirectPromise()
      .then((tokenResponse) => {
        if (tokenResponse !== null) {
          this.accountInfo = tokenResponse.account;
        } else {
          this.accountInfo = this.getAccounts()[0];
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async acquireToken(): Promise<void> {
    var request = {
      scopes: [
        '',
      ],
      account: this.accountInfo,
      forceRefresh: false,
    };

    await this.msalInstance
      .acquireTokenSilent(request)
      .then((tokenResponse) => {
        this.accessToken = tokenResponse.accessToken;
      })
      .catch(async (err) => {
        if (err instanceof msal.InteractionRequiredAuthError) {
          return this.msalInstance.acquireTokenPopup(request);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
