import {Component/*, ViewEncapsulation*/} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

import {LoginComponent} from './login/login.component';
import {TopNavCmp} from './widgets/topnav/components/topnav';

//  import {LoginCmp} from '../../../pages/login/components/login';

import {DashboardCmp} from './dashboard/components/dashboard';

@Component({
	selector: 'app',
	providers: [
		ROUTER_PROVIDERS
	],
	directives: [ROUTER_DIRECTIVES, TopNavCmp],
	template: `
		<topnav></topnav>
		<router-outlet></router-outlet>
	`

})
@RouteConfig([
	{path: '/', name: 'Login', component: LoginComponent, useAsDefault: true},
	{path: '/dashboard/...', component: DashboardCmp, as: 'Dashboard'}
])
export class AppComponent {
	/**
	 * This is a doc comment for `title`.
	 * @example This is a caption.
	 * ```ts
	 * var world: String = 'world';
	 * var hello: String = 'Hello ' + world;
	 * console.log(hello);
	 * ```
	 * @deprecated This is an example of the `deprecated` annotation tag.
	 */
	public title = 'Angular 2 Seed';
}
