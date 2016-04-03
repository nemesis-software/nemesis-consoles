import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

import {LoginComponent} from './login/login.component';

@Component({
	selector: 'app',
	providers: [
		ROUTER_PROVIDERS
	],
	directives: [ROUTER_DIRECTIVES],
	template: `
		<div>
			<ul class="nav nav-pills">
				<li class="nav-item"><a class="nav-link" [routerLink]="['Login']">Login</a></li>
			</ul>
			<hr>
			<router-outlet></router-outlet>
		</div>
	`
})
@RouteConfig([
	{ path: '/login', name: 'Login', component: LoginComponent, useAsDefault: true }
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
