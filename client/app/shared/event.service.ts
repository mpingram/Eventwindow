import { Injectable } 		from '@angular/core';

import { Observable } 			from 'rxjs/Observable';
import { GroupedObservable } from 'rxjs/Operator/groupBy';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Moment } 				from 'moment';

import { EmEvent } 					from './event';
//import { EventList } 		from './event-list';

import { BackendService } from './backend.service';
import { Logger } 				from './logger.service';

declare const moment:any;


@Injectable()
export class EventService {

	// Public
	// ==============================================

	// properties
	public eventBuffer: Observable< GroupedObservable<string,EmEvent> >;
	
	public getEventsByDay( day: Moment ): GroupedObservable<string,EmEvent> {
		let ISOStringKey = day.toISOString();

		let daysEvents = this.eventBuffer.filter(
			 ( obs: GroupedObservable<String,EmEvent> ) =>  obs.key === ISOStringKey
		);

		return daysEvents as GroupedObservable<string, EmEvent>;

	}
	// ============================================



	constructor( 	private backend: BackendService,
								private logger: Logger ) {

		this._eventBufferStartDate = this.today;
		this._eventBufferEndDate = this._eventBufferStartDate.clone().add( this._defaultBufferRange, 'days' );

		this.loadEventBuffer( this._eventBufferStartDate, this._eventBufferEndDate );

		this.getEventsByDay( this.today );
		
	}


	// Private 
	// ===================================================


	// private properties
	// --------------------------
	private _eventList: Observable<EmEvent>
	 
	private _eventBufferStartDate: Moment;
	private _eventBufferEndDate: Moment;
	private _defaultBufferRange: number = 14;

	private _today: Moment = moment().startOf( 'day' );
	private get today(): Moment {
		return this._today.clone();
	}

	// private methods
	// ---------------------------

	private loadEventBuffer( start: Moment, end = start): void {

		// configures eventBuffer with multiple streams ( Observers ), one for
		// each day. Each stream can be selected using parentObservable.flatMap()
		this.eventBuffer = this.backend.getEvents( start, end ).groupBy(
			( event: EmEvent ) => event.start.toISOString()
		)

	}


	/*
	private sortEventIntoBuffer( event:EmEvent ): void {

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