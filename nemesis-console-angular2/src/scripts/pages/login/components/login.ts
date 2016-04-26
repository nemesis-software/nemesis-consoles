import {ILogin} from './login.interface';

export class Login implements ILogin {
	public id:number;
	public user:string;
	public password:string;
	public completed:boolean;

	constructor(user?:string, password?:string) {
		this.id = Math.floor(Math.random() * 11);
		this.user = user;
		this.password = password;
	}
}
