import { Injectable } from '@angular/core';

import { Moment	} from 'moment';
declare const moment:any;


@Injectable()
export class DashboardStateService {

	// get and set event focus
	// -------------------------------------
	public get focusedEvent(): string  			{ return this._focusedEvent };
	public get highlightedEvent(): string  	{ return this._highlightedEvent };
	public get focusedDay(): Moment  				{ return this._focusedDay };

	public set focusedEvent( eventId: string ){
		// toggle focus event
		if ( this._focusedEvent !== eventId ){
			this._focusedEvent = eventId;

		} else {
			this._focusedEvent = '';
		}
	}
	public set focusedDay( day: Moment ){
		this._focusedDay = day;
	}
	public set highlightedEvent( eventId: string ){
		if ( this._focusedEvent !== eventId ){
			this._highlightedEvent = eventId;	
		}
	}
	//--------------------------------------


	// event color map
	// -----------------------------------------
	public getColorOf( eventType: string ){
		return this._eventTypeColorMap[ eventType ];
	}
	// ------------------------------------------

	constructor(){
		this.focusedDay = this._today.clone();
	}
	
	private _focusedEvent: string = '';
	private _highlightedEvent: string = '';
	private _focusedDay: Moment;

	private _today: Moment = moment().startOf('day');
	private _eventTypeColorMap: Object = {
		'Class': '#2E86AB',
		'Meeting': '#4B3F72',
		'Internal Event': '#FFC857',
		'External Event': '#FF1500'

	}
	
}