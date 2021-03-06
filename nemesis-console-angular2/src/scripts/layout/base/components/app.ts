import {Component, ViewEncapsulation} from 'angular2/core';
import {
	RouteConfig,
	ROUTER_DIRECTIVES
} from 'angular2/router';

import {LoginComponent} from '../../../pages/login/components/login.component';
import {SignupCmp} from '../../../pages/signup/components/signup';
import {DashboardCmp} from '../../dashboard/components/dashboard';

@Component({
	selector: 'app',
	templateUrl: '/app.html',
	styleUrls: ['/app.css'],
	encapsulation: ViewEncapsulation.None,
	directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
	{path: '/', component: LoginComponent, as: 'Login', useAsDefault: true},
	{path: '/signup', component: SignupCmp, as: 'Signup'},
	{path: '/dashboard/...', component: DashboardCmp, as: 'Dashboard'}
])
export class AppCmp {
}
