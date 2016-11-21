import { Component } from '@angular/core';

import { DashboardStateService } from '../shared-dashboard/dashboard-state.service';

import { Moment } from 'moment';
declare const moment:any;


@Component({
	selector: 'em-resource-viewer',
	templateUrl: './app/dashboard/resource-viewer/resource-viewer.component.html',
	styleUrls: [ './app/dashboard/resource-viewer/resource-viewer.component.css' ]
})
export class ResourceViewerComponent {

	// public properties
	// --------------------------------------
	public get currentDayIsToday(): boolean{
		return this._today.isSame( this._date, 'day' );
	}
	public get date(): Moment{
		return this.dashboardState.focusedDay.clone();
	}
	public resources: string[] = this.generateResources();

	// public methods
	// --------------------------------------
	public nextDay(): void {
		this._date.add( 1, 'day' );
		this.setFocusedDay( this._date );
	}
	public prevDay(): void {
		this._date.subtract( 1, 'day' );
		this.setFocusedDay( this._date );
	}
	public goToDate( targetDate: Moment ): void {
		this._date = targetDate.clone();
		this.setFocusedDay( this._date );
	}
	public goToToday(): void {
		if ( !this.currentDayIsToday ){
			this._date = this._today.clone();
			this.setFocusedDay( this._date );
		}
	}


	constructor( private dashboardState: DashboardStateService ){ 
		this._date = this.dashboardState.focusedDay.clone();
	};


	// private properties
	// ------------------------------------------
	private _today: Moment = moment().startOf('day');
	// internal state tracker
	// FIXME: possible synchronization errors?
	private _date: Moment;

	// private methods
	// ------------------------------------------
	
	private setFocusedDay( focusedDay: Moment ): void {
		this.dashboardState.focusedDay = focusedDay;
	}

	// debug
	private generateResources(): string[] {

		let resources: string[] = [
			'120',
			'129',
			'WIa',
			'WIb',
			'WII',
			'WIII',
			'WIV',
			'EI',
			'EII',
			'EIII',
			'EIV',
			'Lobby',
			'Library'
		]
		return resources; 
	}

}
