import 'rxjs/add/operator/map';

import {Injectable} from 'angular2/core';
import {Response} from 'angular2/http';

import {Router} from 'angular2/router';

import {RestService} from '../../../shared/services/rest.service';
import {ILogin} from './login.interface';

@Injectable()
export class LoginService {
	public auth: ILogin[] = [];
	token: string;

	constructor(
		private rest: RestService,
		private _router:Router
	) {
		this.token = localStorage.getItem('token');
	}
	login(login: ILogin): void {
		this.rest.create('/auth', login)
			.map((res : Response) => {
				let data = res.json();
				this.token = data.token;
				localStorage.setItem('token', this.token);
			})
			.subscribe(() => {
				console.log('logged in!');
				this._router.navigate(['Dashboard']);
			});
	}
}
