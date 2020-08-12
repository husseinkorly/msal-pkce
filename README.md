# MSAL-PKCE

A sample Angular application using [Microsoft Authentication Library for JavaScript (MSAL.js) 2.0](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-browser). This version of MSAL library uses the OAuth 2.0 Authorization Code Flow with [PKCE](https://oauth.net/2/pkce/)  
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.4.

## Running locally
- [Register a new AAD application](https://docs.microsoft.com/en-us/azure/active-directory/develop/scenario-spa-app-registration), and add the Application (client) ID to the environment.ts
- Configure the API scope in `auth.service.ts`
- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
