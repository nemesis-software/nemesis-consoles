import {HTTP_PROVIDERS} from 'angular2/http';
import {Component} from 'angular2/core';

import {LoginService} from './login.service';
// import {LoginListComponent} from './login-list.component';
import {LoginInputComponent} from './login-input.component';

import {RestOptions, RestService} from '../../../shared/services/rest.service';

@Component({
	selector: 'login',
	providers: [
		HTTP_PROVIDERS,
		RestOptions,
		RestService,
		LoginService
	],
	directives: [LoginInputComponent /* , LoginListComponent*/],
	template: `
		<div class="login-page">
			<div class="row">
				<div class="col-lg-4 col-lg-offset-4">
					<login-input></login-input>
					<br>
					<!--<login-list></login-list>-->
				</div>
			</div>
		</div>
	`
})
export class LoginComponent {
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
	public header = 'Login';
}
