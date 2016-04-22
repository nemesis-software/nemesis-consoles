import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

@Component({
	selector: 'bs-component',
	templateUrl: './bs-element.html'
})

export class BSCmp {
	constructor(private _router: Router) { }
	gotoDashboard() {
		this._router.navigate(['Home']);
	}
}
