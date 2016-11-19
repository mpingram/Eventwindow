import { Component } 	from '@angular/core';

import { DashboardStateService }	from '../../shared-dashboard/dashboard-state.service';

import { Moment }							from 'moment';
declare const moment: any;

@Component({
	moduleId: module.id,
	selector: 'em-event-list',
	templateUrl: 'event-list.component.html',
	styleUrls: [ 'event-list.component.css' ],
})
export class EventListComponent {

	// ----
	public days: Moment[] = [];
	public get focusedDay(): Moment {
		return this.dashboardState.focusedDay;
	};

	// ----
	public isFocusedDay( day: Moment ): boolean {
		return day.isSame( this.focusedDay, 'day' );
	}


	constructor( private dashboardState: DashboardStateService ){ 
		this.days = this.initializeDays();
	};

	// ----
	private _today: Moment = moment().startOf('day');
	private _defaultNumDays: number = 14;

	// ----
	private initializeDays(): Moment[] {

		const numDays = this._defaultNumDays;
		const lastDayIndex = this._defaultNumDays - 1;

		let days: Moment[] = Array( numDays );
		days.fill( undefined );

		let currDay = this._today.clone();
		return days.map( ( day: Moment, index: number ) => {
			day = currDay.clone();
			currDay.add( 1, 'day' );
			return day;
		});


	}
}