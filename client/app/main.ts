import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
// polyfill
//import 'web-animations-js';

platformBrowserDynamic().bootstrapModule(AppModule);