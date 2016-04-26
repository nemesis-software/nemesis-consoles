import 'rxjs/add/operator/map';

import {Injectable} from 'angular2/core';
import {Response} from 'angular2/http';

import {RestService} from '../../../shared/services/rest.service';
import {ILogin} from './login.interface';

@Injectable()
export class LoginService {
	public auth: ILogin[] = [];
	token: string;

	constructor(
		private rest: RestService
	) {
		this.token = localStorage.getItem('token');
	}

	/*fetch(): void {
		this.rest.read('/auth', { email: 'admin@admin.com', password: 'admin' })
			.map((res: Response) => res.json())
			.subscribe((auth: ILogin[]) => this.auth = auth);
	}*/
	fetch(): void {
		this.rest.read('/auth', JSON.stringify({
				email: 'admin@admin.com',
				password: 'admin' }))
			.map((res : Response) => {
				let data = res.json();
				this.token = data.token;
				localStorage.setItem('token', this.token);
			});
	}

	create(login: ILogin): void {
		this.auth.unshift(login);

		this.rest.create('/users', login)
			.subscribe(() => console.log('created!'));
	}

	update(login: ILogin): void {
		this.rest.update(`/users/${login.id}`, login)
			.subscribe(() => console.log('updated!'));
	}

	delete(login: ILogin): void {
		this.auth.splice(this.auth.indexOf(login), 1);

		this.rest.delete(`/users/${login.id}`)
			.subscribe(() => console.log('deleted!'));
	}
}
