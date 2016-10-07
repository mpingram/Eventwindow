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

	private _eventBufferBehaviorSubject: BehaviorSubject<EventBuffer>;

	public eventBuffer: EventBuffer = [[]];

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
		// FXIME: still not grokking it
		this._asyncLoadEventBuffer( start, end )
		.subscribe( (events: EventBuffer) => {
			this.eventBuffer = (events);
		});
	}

	private _createEventBufferOfLength( length: number ): EventBuffer {
		let eventBuffer: EventBuffer = [];

		for (let i = 0; i < length; i++){
			eventBuffer[i] = [];
		}

		return eventBuffer;
	}

	// side effect: mutates target EventBuffer
	private _sortEventIntoBuffer( event: Event, targetBuffer: EventBuffer ): void {
		let index: number;
		

	}

	private _observableErrorHandler(error:any){
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  	this.logger.error(errMsg);
    return Observable.throw(errMsg);
  }
	
	private _asyncLoadEventBuffer(bufferStart: Moment, bufferEnd: Moment ): Observable<EventBuffer> {

		return this.backend.getEvents( bufferStart, bufferEnd );

	}
}