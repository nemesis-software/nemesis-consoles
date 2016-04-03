import 'rxjs/add/operator/map';

import {Injectable} from 'angular2/core';
import {Response} from 'angular2/http';

import {RestService} from '../shared/services/rest.service';
import {ILogin} from './login.interface';

@Injectable()
export class LoginService {
	public auth: ILogin[] = [];

	constructor(
		private rest: RestService
	) {}

	fetch(): void {
		this.rest.read('/auth', { id: 1 })
			.map((res: Response) => res.json())
			.subscribe((auth: ILogin[]) => this.auth = auth);
	}

	create(login: ILogin): void {
		this.auth.unshift(login);

		this.rest.create('/auth', login)
			.subscribe(() => console.log('created!'));
	}

	update(login: ILogin): void {
		this.rest.update(`/auth/${login.id}`, login)
			.subscribe(() => console.log('updated!'));
	}

	delete(login: ILogin): void {
		this.auth.splice(this.auth.indexOf(login), 1);

		this.rest.delete(`/auth/${login.id}`)
			.subscribe(() => console.log('deleted!'));
	}
}
