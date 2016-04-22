import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

@Component({
	selector: 'tables',
	templateUrl: './tables.html'
})

export class TableCmp {
	constructor(private _router:Router) {
	}

	gotoDashboard() {
		this._router.navigate(['Home']);
	}
}
