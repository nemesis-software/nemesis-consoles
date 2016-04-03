import {NgFor} from 'angular2/common';
import {Component} from 'angular2/core';

import {ILogin} from './login.interface';
import {LoginService} from './login.service';
import {LoginItemComponent} from './login-item.component';

@Component({
	selector: 'login-list',
	directives: [NgFor, LoginItemComponent],
	template: `
		<ul class="list-unstyled">
			<li *ngFor="#login of loginService.auth">
				<login-item
					[login]="login"
					(delete)="delete(login)"
					(update)="update(login)">
				</login-item>
			</li>
		</ul>
	`
})
export class LoginListComponent {
	constructor(
		private loginService: LoginService
	) {
		this.loginService.fetch();
	}

	delete(login: ILogin): void {
		this.loginService.delete(login);
	}

	update(login: ILogin): void {
		this.loginService.update(login);
	}
}
