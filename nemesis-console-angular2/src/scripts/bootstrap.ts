// @if isProd
import {enableProdMode} from 'angular2/core';
enableProdMode();
// @endif
import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {AppCmp} from './layout/base/components/app';

bootstrap(AppCmp, [
	ROUTER_PROVIDERS,
	provide(LocationStrategy, { useClass: HashLocationStrategy })
]);
