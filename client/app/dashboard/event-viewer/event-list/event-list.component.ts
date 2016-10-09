import { Component, OnInit } 	from '@angular/core';

import { Moment }							from 'moment';
declare const moment: any;

@Component({
	moduleId: module.id,
	selector: 'em-event-list',
	templateUrl: 'event-list.component.html',
	styleUrls: [ 'event-list.component.css' ],
})
export class EventListComponent implements OnInit {

	public days: Moment[] = [];

	// FIXME: hardcoded? Should be set by dashboard?
	private _defaultNumDays: number = 14;

	constructor(){};

	ngOnInit(){

		this.days = this.initializeDays();
		
	}

	private initializeDays(): Moment[] {

		let days: Moment[] = [];
		const numDays: number = this._defaultNumDays;
		// FIXME: hardcoded to start at present
		const startDay: Moment = moment().startOf('day');

		for (let i = 0; i < numDays; i++ ){
			let day = startDay.clone();
			day.add( i, 'days');
			days.push(day);
		}

		return days;
	}
}