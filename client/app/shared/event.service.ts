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

	private _eventBuffer: BehaviorSubject<EventBuffer>;

	private _defaultBufferSize: number = 14;

	constructor( 
	 private backend: BackendService,
	 private logger: Logger ) {
		this._init();
	}

	/*
	public get eventBuffer() : EventBuffer {
		//this._eventBuffer;
	} */

	private _init(): void {
		// FIXME: hardcoded
		let start = moment();
		let end = start.clone().add( this._defaultBufferSize, 'days' );

		this._asyncLoadEventBuffer( start, end );
	}

	/*
	private _sortEventsByStart(eventArray: Event[]): Event[] {
		return eventArray.sort( (a,b) => {
			if (a.start.isAfter(b.start)) return 1;
			else if (a.start.isBefore(b.start)) return -1;
			else return 0;
		});
	}
	*/

	// accepts sorted array of Events
	private _convertToBuffer(eventArray: Event[]): EventBuffer {

		let buffer: EventBuffer = [];

		const lastIndex: number = eventArray.length - 1;
		const firstDay: Moment = eventArray[0].start.clone();
		const lastDay: Moment = eventArray[lastIndex].start.clone();

		let currentDay: Moment = firstDay.clone();
		let event: Event;
		let bufferDay: Event[] = [];
		for (let i = 0; i <= lastIndex; i++){

			event = eventArray[i];

			if (event.start.isSame(currentDay, 'day')){
				bufferDay.push(event);

			} else {
				buffer.push(bufferDay);
				bufferDay = [];
				bufferDay.push(event);
				currentDay.add(1,'day');
			}

			if ( i === lastIndex ){
				buffer.push(bufferDay);
			}
		}
		return buffer;
	}

	private _errorHandler(error:any){
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  	this.logger.error(errMsg);
    return Observable.throw(errMsg);
  }
	
	private _asyncLoadEventBuffer(bufferStart: Moment, bufferEnd: Moment ): Observable<EventBuffer> {

		return this.backend.getEvents( bufferStart, bufferEnd )
			.map( this._convertToBuffer );

		/*
		return this.backend.getEvents(bufferStart, bufferEnd)
		.map( (eventArray:Event[]) => {
				this.logger.log(`Fetched ${eventArray.length} events.`);
				this._sortEventsByStart(eventArray);
				return Promise.resolve<EventBuffer>(this._convertToBuffer(eventArray));
		}); 
		*/
	}
}