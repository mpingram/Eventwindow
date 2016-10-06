import { Injectable } from '@angular/core';
import { Moment } 		from 'moment';

import { Event } from './event';
import { EventBuffer } from './event-buffer';

import { BackendService } from './backend.service';
import { Logger } from './logger.service';

@Injectable()
export class EventService {

	private eventBuffer: EventBuffer;

	private defaultBufferSize: number = 14;

	private bufferSize: number = this.defaultBufferSize;


	constructor(
		private backend: BackendService,
		private logger: Logger ) { }

	private sortEventsByStart(eventArray: Event[]){
		return eventArray.sort( (a,b) => {
			if (a.start.isAfter(b.start)) return 1;
			else if (a.start.isBefore(b.start)) return -1;
			else return 0;
		});
	}


	// accepts sorted array of Events
	private convertToBuffer(eventArray: Event[]): EventBuffer {

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


	public asyncLoadEventBuffer(bufferStart: Moment, bufferEnd: Moment ): Promise<EventBuffer> {

		return this.backend.getEvents(bufferStart, bufferEnd)
		.then( (eventArray:Event[]) => {
				this.logger.log(`Fetched ${eventArray.length} events.`);
				this.sortEventsByStart(eventArray);
				return Promise.resolve<EventBuffer>(this.convertToBuffer(eventArray));
		});

	}
}
