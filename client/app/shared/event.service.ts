import { Injectable } from '@angular/core';

import { Event } from './event';

import { BackendService } from './backend.service';
import { Logger } from './logger.service';

//import * as moment from 'moment';
//declare const moment: any;

@Injectable()
export class EventService {

	private eventBuffer: Event[][] = [];

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
		// fixme: nullable event[] []?
		let buffer: Event[][];
		let numEvents: number = events.length;
		let bufferIndex: number = 0;
		let currentDay = events[0].start.startOf('day');

		for (let i = 0; i < numEvents; i++){

			let thisDay = events[i].start.startOf('day');
			while (thisDay.isAfter(currentDay)){
				currentDay.add(1,'day');
				bufferIndex += 1;
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
			console.log(events);
			this.sortEventsByStart(events);
			// FIXME: hardcoded bufferSize. Need to find a way to set it
			this.eventBuffer = this.convertToBuffer(events, bufferSize);
		});
		return this.eventBuffer;
	}
}
