import {ILogin} from './login.interface';

export class Login implements ILogin {
	public user:string;
	public password:string;

	constructor(user?:string, password?:string) {
		this.user = user;
		this.password = password;
	}
}
