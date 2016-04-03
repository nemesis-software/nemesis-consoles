import {NgIf} from 'angular2/common';
import {Component, Input, Output, EventEmitter} from 'angular2/core';

import {ILogin} from './login.interface';

@Component({
	selector: 'login-item',
	directives: [NgIf],
	template: `
		<div class="row login-item" [ngClass]="{ completed: login.completed }">
			<div class="col-xs-1">
				<input type="checkbox" class="login-item-select" [(ngModel)]="login.completed" (click)="update(login)">
			</div>

			<div class="col-xs-4">
				<span class="login-item-text" *ngIf="!editing" (click)="toggleEditState()">
					{{ login.user }}
				</span>
			<div class="col-xs-4">
				<span class="login-item-text" *ngIf="!editing" (click)="toggleEditState()">
					{{ login.password }}
				</span>
			</div>
				<form *ngIf="editing" (ngSubmit)="submit(login)">
					<input type="text" class="login-item-input" [(ngModel)]="login.user">
					<input type="text" class="login-item-input" [(ngModel)]="login.password">
				</form>
			</div>

			<div class="col-xs-3">
				<button class="login-item-delete" (click)="delete(login)">Delete</button>
			</div>
		</div>
	`
})
export class LoginItemComponent {
	private editing:boolean = false;

	@Input() login:ILogin;
	@Output('delete') deleteEmitter:EventEmitter<ILogin> = new EventEmitter();
	@Output('update') updateEmitter:EventEmitter<ILogin> = new EventEmitter();

	delete(login:ILogin):void {
		this.deleteEmitter.emit(login);
	}

	update(login:ILogin):void {
		this.updateEmitter.emit(login);
	}

	submit(login:ILogin):void {
		this.update(login);
		this.toggleEditState();
	}

	toggleEditState():void {
		this.editing = !this.editing;
	}
}
