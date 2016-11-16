import { Injectable } 		from '@angular/core';

import { Observable } 		from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Moment } 				from 'moment';

import { EmEvent } 					from './event';
import { EventBuffer } 		from './event-buffer';

import { BackendService } from './backend.service';
import { Logger } 				from './logger.service';

declare const moment:any;


@Injectable()
export class EventService {

	// Public
	// ==============================================

	// properties
	public eventBuffer: Observable<EventBuffer> = this._eventBuffer.asObservable();
	
	public getEventsByDay( day: Moment ): Observable<EventBuffer> {

		return this.eventList.groupBy( ( eventBuffer: EventBuffer , index: number) => {
			return eventBuffer[ index ].start.isSame( day, 'day' );
		});

	}
	// ============================================



	constructor( 	private backend: BackendService,
								private logger: Logger ) {

		this._eventBufferStartDate = this.today;
		this._eventBufferEndDate = this._eventBufferStartDate.clone().add( this._defaultBufferRange, 'days' );

		this.extendEventBufferFrom( this._eventBufferStartDate, this._eventBufferEndDate );
		
	}


	// Private 
	// ===================================================


	// private properties
	// --------------------------
	private _eventList: BehaviorSubject<EmEvent[]> = new BehaviorSubject( [] );

	private _today: Moment = moment().startOf( 'day' );
	private get today(): Moment {
		return this._today.clone();
	}

	private _eventBufferStartDate: Moment;
	private _eventBufferEndDate: Moment;

	private _defaultBufferRange: number = 14;


	// private methods
	// ---------------------------

	private extendEventBufferFrom( start: Moment, end = start): void {

		this.backend.getEvents( start, end ).subscribe(
				( event:EmEvent ) => /*this.eventBuffer.add( event ),*/
				( error:any ) => this.observableErrorHandler( error )
		)
	}

	/*
	private sortEventIntoBuffer( event:EmEvent): void {

		// convert the event's start time to an ISO-formatted string representation
		let eventISODateString = event.start.clone().startOf('day').format();

		// if the property matching the ISO date string doesn't exist
		// in the eventBuffer, initialize the value as an empty array.
		// FIXME: no distinction between empty events in range and unloaded events out of range.
		if ( this._eventBuffer[ eventISODateString ] === undefined ) {
			this._eventBuffer[ eventISODateString ] = [];
		}

		// push that event onto the stack of events in that day.
		this._eventBuffer[ eventISODateString ].push(event);
	}
	*/

	private observableErrorHandler(error:any): Observable<any> {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  	this.logger.error(errMsg);
    return Observable.throw(errMsg);
  }


}