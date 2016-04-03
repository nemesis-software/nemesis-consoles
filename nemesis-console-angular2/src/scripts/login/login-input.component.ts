import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';

import {Login} from './login';
import {ILogin} from './login.interface';
import {LoginService} from './login.service';

import {LogElement} from '../shared/directives/log-element.directive';

@Component({
	selector: 'login-input',
	directives: [FORM_DIRECTIVES, LogElement],
	template: `
		<form (ngSubmit)="submit(login)">
			<input
				type="text"
				class="form-control form-control-lg"
				placeholder="Username, press enter to save"
				[(ngModel)]="login.user"
				logElement>

			<input
				type="text"
				class="form-control form-control-lg"
				placeholder="Password, press enter to save"
				[(ngModel)]="login.password"
				logElement>
			<input type="submit"
			class="form-control form-control-lg"
			/>
		</form>
	`
})
export class LoginInputComponent {
	login: ILogin = new Login();

	constructor(
		private loginService: LoginService
	) {}

	submit(login: ILogin): void {
		console.log(login);
		if (!login.user) {
			return;
		}
		this.loginService.create(login);
		this.login = new Login();
	}
}
