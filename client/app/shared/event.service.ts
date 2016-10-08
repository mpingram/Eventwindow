import { Injectable } 		from '@angular/core';

import { Observable } 		from 'rxjs/Observable';
import { Subject }				from 'rxjs/Subject';
import { BehaviorSubject } 	from 'rxjs/Rx';

import { Moment } 				from 'moment';

import { Event } 					from './event';
import { EventBuffer } 		from './event-buffer';

import { BackendService } from './backend.service';
import { Logger } 				from './logger.service';

declare const moment:any;

@Injectable()
export class EventService {


	// TODO: understand
	private _eventBufferBehaviorSubject: BehaviorSubject<EventBuffer>;
	private _eventBuffer: EventBuffer;
	private _bufferStartDate: Moment;
	private _defaultBufferSize: number = 14;

	public get eventBuffer() : EventBuffer {
		return this._eventBuffer;
	} 

	constructor( 
	 private backend: BackendService,
	 private logger: Logger ) {

		this._init();

	}

	private _init(): void {

		this._bufferStartDate = moment().startOf('day');

		// FIXME: hardcoded
		let start = this._bufferStartDate.clone();
		let end = start.clone().add( this._defaultBufferSize, 'days' );


		this._loadEventBuffer();
		// FXIME: still not grokking it
		this._loadEvents( start, end )
			.map( this._sortEventsIntoBuffer );

	}


	// FIXME: type confusion
	private _sortEventsIntoBuffer( event: Event, index?: number ): void {

		const firstDayInBuffer: Moment = this._bufferStartDate.clone();
		const eventDate: Moment = event.start.clone();

		const daysFromFirstDay: number = eventDate.diff( firstDayInBuffer, 'days' );
		
		if ( daysFromFirstDay < 0 ){
			throw new Error('Event ' + event.name + ' out of range of buffer');
		}

		this._eventBuffer[ daysFromFirstDay ].push(event);

	}

	private _observableErrorHandler(error:any): Observable<any> {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  	this.logger.error(errMsg);
    return Observable.throw(errMsg);
  }
	
	private _loadEvents( start: Moment, end: Moment ): Observable<Event> {

		return this.backend.getEvents( start, end );

	}

	private _loadEventBuffer( start: Moment, end: Moment ): BehaviorSubject<Event[]> {

		let behaviorSubject: BehaviorSubject<Event[]>;

		this._loadEvents(start, end)
			.map( this._sortEventsIntoBuffer );
	}
}