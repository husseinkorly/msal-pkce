// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { LogLevel } from '@azure/msal-browser';

export const environment = {
  production: false,

  msal_config: {
    auth: {
      clientId: '',
      /*
      You need specify the TenantId only if you want to accept access tokens from a single tenant
      (line-of-business app).
      Otherwise, you can leave them set to common.
      This can be:
      - A GUID (Tenant ID = Directory ID)
      - 'common' (any organization and personal accounts)
      - 'organizations' (any organization)
      - 'consumers' (Microsoft personal accounts)
    */
      //authority: 'https://login.microsoftonline.com/common',
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateinCookie: false
    },
    system: {
      loggerOptions: {
        loggerCallback: (
          level: LogLevel,
          message: string,
          containsPii: boolean
        ): void => {
          if (containsPii) {
            return;
          }
          switch (level) {
            case LogLevel.Error:
              console.error(message);
              return;
            case LogLevel.Info:
              console.info(message);
              return;
            case LogLevel.Verbose:
              console.debug(message);
              return;
            case LogLevel.Warning:
              console.warn(message);
              return;
          }
        },
        piiLoggingEnabled: false,
      },
      windowHashTimeout: 60000,
      iframeHashTimeout: 6000,
      loadFrameTimeout: 0,
    },
  },
};
