import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Router} from 'angular2/router';

import {Login} from './login';
import {ILogin} from './login.interface';
import {LoginService} from './login.service';

import {LogElement} from '../../../shared/directives/log-element.directive';

@Component({
	selector: 'login-input',
	directives: [FORM_DIRECTIVES, LogElement],
	templateUrl: './login.html'
})
export class LoginInputComponent {
	login: ILogin = new Login();

	constructor(
		private loginService: LoginService,
		private _router:Router
	) {}

	submit(login: ILogin): void {
		console.log(login);
		if (!login.user) {
			return;
		}
		this.loginService.create(login);
		this.login = new Login();
	}
	gotoDashboard() {
		this._router.navigate(['Dashboard']);
	}

	gotoSignup() {
		this._router.navigate(['Signup']);
	}
}
