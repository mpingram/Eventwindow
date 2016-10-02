import { Injectable } from '@angular/core';
import { Moment } 		from 'moment';

import { Event } from './event';

import { BackendService } from './backend.service';
import { Logger } from './logger.service';

@Injectable()
export class EventService {

	private eventBuffer: Event[][];

	private defaultBufferSize = 14;


	constructor(
		private backend: BackendService,
		private logger: Logger ) { }

	private sortEventsByStart(events: Event[]){
		return events.sort( (a,b) => {
			if (a.start.isAfter(b.start)) return 1;
			else if (a.start.isBefore(b.start)) return -1;
			else return 0;
		})
	}

	private convertToBuffer(events: Event[], bufferSize: number): Event[][] {

		let buffer: Event[][] = [];
		// initialize buffer with empty arrays
		for (let i = 0; i < bufferSize; i++){
			buffer[i] = [];
		}
		let numEvents: number = events.length;
		let bufferIndex: number = 0;
		let currentDay = events[0].start.clone().startOf('day');

		for (let i = 0; i < numEvents; i++){
			let thisDay = events[i].start.clone().startOf('day');
			while (thisDay.isAfter(currentDay)){
				currentDay.add(1,'day');
				bufferIndex++;
			}
			buffer[bufferIndex].push(events[i]);
		}

		return buffer;
	}


	// TODO: decide if we want a unidirectional buffer (like this one)
	// or a combination of unidirectional (at initialization) and then bidirectional
	loadEventBuffer(bufferStart: Moment, bufferSize: number = this.defaultBufferSize ) : Event[][]{

		let rangeStart = bufferStart;
		let rangeEnd = bufferStart.clone().add(bufferSize, 'days');

		this.backend.getEvents(rangeStart, rangeEnd).then( (events:Event[]) => {
			this.logger.log(`Fetched ${events.length} events.`);
			this.logger.log(events);
			this.sortEventsByStart(events);
			this.eventBuffer = this.convertToBuffer(events, bufferSize)
		})

		return this.eventBuffer;
	}

	getEvents(rangeStart: Moment, rangeEnd: Moment): Event[][] {
		this.logger.warn('eventService.getEvents is deprecated');
		this.backend.getEvents(rangeStart, rangeEnd).then( (events: Event[]) => {
			this.logger.log(`Fetched ${events.length} events.`);
			this.sortEventsByStart(events);
			this.logger.log(events);
			// FIXME: HARDCODED AND ERROR BUG CAUSER
			this.eventBuffer = this.convertToBuffer(events, this.defaultBufferSize);
			this.logger.log(this.eventBuffer);
		});
		return this.eventBuffer;
	}
}
