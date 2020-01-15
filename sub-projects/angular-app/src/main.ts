// import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
// import { environment } from './environments/environment';
import singleSpaAngular2 from 'single-spa-angular2';
import {Router} from '@angular/router';

const ng2Lifecycles = singleSpaAngular2({
  domElementGetter: () => document.getElementById('angular-app'),
  mainModule: AppModule,
  angularPlatform: platformBrowserDynamic(),
  template: `<app-root />`,
   Router,
});

export const bootstrap = [
  ng2Lifecycles.bootstrap,
];

export const mount = [
  ng2Lifecycles.mount,
];

export const unmount = [
  ng2Lifecycles.unmount,
];

// if (environment.production) {
//   enableProdMode();
// }

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));
