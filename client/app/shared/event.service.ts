import { Injectable } from '@angular/core';

import { Event } from './event';

import { BackendService } from './backend.service';
import { Logger } from './logger.service';

@Injectable()
export class EventService {

	private eventBuffer: Event[][];

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

	private convertToBuffer(events: Event[], bufferSize: number){
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

	private defaultBufferSize = 14;

	getEvents(bufferSize?: number){

		if (bufferSize === undefined) {
			bufferSize = this.defaultBufferSize;
		}

		this.backend.getAll(Event, bufferSize).then( (events: Event[]) => {
			this.logger.log(`Fetched ${events.length} events.`);
			this.sortEventsByStart(events);
			this.logger.log(events);
			this.eventBuffer = this.convertToBuffer(events, bufferSize);
			this.logger.log(this.eventBuffer);
		});
		return this.eventBuffer;
	}
}
