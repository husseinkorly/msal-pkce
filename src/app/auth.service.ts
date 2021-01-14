import { Injectable } from '@angular/core';
import * as msal from '@azure/msal-browser';
import { environment } from 'src/environments/environment';

import { from, Observable, of } from 'rxjs';

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
  }

  login(): void {
    // optional for login. scopes can be defined for pre-consent
    let loginRequest = {
      scopes: [
        // 'api://144ee3fb-bdfd-49be-bebe-bdc3f49d05d7/dummy.read'
      ],
    };
    this.msalInstance.loginRedirect();

    // try {
    //   this.msalInstance.loginRedirect();
    // } catch (err) {
    //   console.log(err);
    // }
  }

  getAccounts(): msal.AccountInfo[] {
    return this.msalInstance.getAllAccounts();
  }

  handleRedirect(): void {
    // return from(
    //   this.msalInstance.handleRedirectPromise()
    // );
    this.msalInstance
      .handleRedirectPromise()
      .then((tokenResponse) => {
        if (tokenResponse !== null) {
          console.log('token response: ', tokenResponse);
          this.accountInfo = tokenResponse.account;
        } else {
          this.accountInfo = this.getAccounts()[0];
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public acquireToken(): Promise<void | msal.AuthenticationResult> {
    const request = {
      scopes: [
        'api://9dc892b6-024d-4840-a6f8-0285f376e688/access_as_user'
      ],
      account: this.accountInfo,
      forceRefresh: false,
    };

    return this.msalInstance
      .acquireTokenSilent(request)
      .then((response) => {
        return response;
      })
      .catch(async (error) => {
        if (error instanceof msal.InteractionRequiredAuthError) {
          this.msalInstance.acquireTokenPopup(request);
        }
      })
      .catch((error) => {
        console.log();
      });
  }
}
