import {HTTP_PROVIDERS} from 'angular2/http';
import {Component} from 'angular2/core';

import {LoginService} from './login.service';
import {LoginListComponent} from './login-list.component';
import {LoginInputComponent} from './login-input.component';

import {RestOptions, RestService} from '../shared/services/rest.service';

@Component({
	selector: 'login',
	providers: [
		HTTP_PROVIDERS,
		RestOptions,
		RestService,
		LoginService
	],
	directives: [LoginInputComponent, LoginListComponent],
	template: `
		<div class="row">
			<div class="col-md-6 col-md-offset-3">
				<login-input></login-input>
				<br>
				<login-list></login-list>
			</div>
		</div>
	`
})
export class LoginComponent {
	public header = 'Login';
}
