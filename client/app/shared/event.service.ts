import { Injectable }	from '@angular/core';

import { Observable }	from 'rxjs/Observable';
import { GroupedObservable } from 'rxjs/Operator/groupBy';

import { Moment }	from 'moment';

import { EmEvent } from './event';
import { EventList } from './event-list';

import { BackendService } from './backend.service';
import { Logger } from './logger.service';

declare const moment:any;


@Injectable()
export class EventService {

	// Public
	// ==============================================

	// properties
	public eventBuffer: Observable< GroupedObservable<string,EmEvent> >;
	
	public getEventsByDay( day: Moment ): EventList {

		let ISOStringKey = day.clone().startOf('day').toISOString();
		
		let daysEvents = this.eventBuffer.find(
			 ( obs: GroupedObservable<string,EmEvent> ) => obs.key === ISOStringKey
 		).flatMap( 
 			( obs: GroupedObservable<string, EmEvent> ) => {
 				// if no result from find() method
 				if ( obs === undefined ){
 					return Observable.from( [] );
 				} else {
 					return Observable.from( obs.toArray() );
 				}
 			}
 		)

 		return daysEvents;

	}
	// ============================================



	constructor( 	private backend: BackendService, private logger: Logger ) {

		this._eventBufferStartDate = this.today;
		this._eventBufferEndDate = this._eventBufferStartDate.clone().add( this._defaultBufferRange, 'days' );

		this.loadEventBuffer( this._eventBufferStartDate, this._eventBufferEndDate );
		
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

		// split incoming data ( as Observable<EmEvent> ) into multiple streams, one for
		// each day. Each stream can be selected using parentObservable.flatMap()
		this.eventBuffer = this.backend.getEvents( start, end ).groupBy(
			( event: EmEvent ) => event.start.clone().startOf('day').toISOString()
		)

	}


	private observableErrorHandler(error:any): Observable<any> {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  	this.logger.error(errMsg);
    return Observable.throw(errMsg);
  }


}