import { Component } from '@angular/core';

import { Moment } from 'moment';
declare const moment:any;

import { ResourceCalendarComponent } from './resource-calendar.component';

@Component({
	selector: 'em-resource-viewer',
	templateUrl: './app/dashboard/resource-viewer/resource-viewer.component.html',
	styleUrls: [ './app/dashboard/resource-viewer/resource-viewer.component.css' ]
})
export class ResourceViewerComponent {

	private _today: Moment = moment().startOf('day');
	private _date: Moment = this._today.clone();

	public get date(): Moment{
		return this._date.clone();
	}
	public nextDay(){
		this._date.add( 1, 'day' )
	}
	public prevDay(){
		this._date.subtract( 1, 'day' )
	}
	public goToDate( targetDate: Moment ){
		this._date = targetDate.clone();
	}
	public goToToday(){
		this._date = this._today.clone();
	}

}
