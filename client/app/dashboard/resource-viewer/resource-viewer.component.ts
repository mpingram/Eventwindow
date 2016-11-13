import { Component } from '@angular/core';

import { Moment } from 'moment';
declare const moment:any;

import { ResourceSchedulerComponent } from './resource-scheduler.component';

@Component({
	selector: 'em-resource-viewer',
	templateUrl: './app/dashboard/resource-viewer/resource-viewer.component.html',
	styleUrls: [ './app/dashboard/resource-viewer/resource-viewer.component.css' ]
})
export class ResourceViewerComponent {

	private _today: Moment = moment().startOf('day');
	private _date: Moment = this._today.clone();

	public currentDayIsToday = () => {
		return this._today.isSame( this._date, 'day' );
	}
	get date(): Moment{
		return this._date.clone();
	}

	private _resources: string[] = this.generateResources();
	get resources(): String[] {
		return this._resources;
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
		if ( !this.currentDayIsToday() ){
			this._date = this._today.clone();
		}
	}

	// debug
	private generateResources(): string[] {
		/*
		let resourceTemplate: string = 'Room';
		let resources: string[] = [];
		for ( let i = 1; i < 20; i++ ){
			resources.push( resourceTemplate + ' ' + i );
		}
		*/
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
