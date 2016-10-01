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
		let buffer: Event[][] = [];
		for (let i = 0; i < bufferSize; i++){
			buffer[i] = [];
		}
		// fill out buffer with number of days
		let numEvents: number = events.length;
		let bufferIndex: number = 0;
		let currentDay = events[0].start.dayOfYear;

		for (let i = 0; i < numEvents; i++){
			let thisDay = events[i].start.dayOfYear;
			while (thisDay > currentDay){
				events[i].start.add(1,'day');
				console.log(typeof currentDay);
				currentDay = events[i].start.dayOfYear;
				//currentDay++;
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
			this.sortEventsByStart(events);
			console.log(events);
			this.eventBuffer = this.convertToBuffer(events, bufferSize);
			console.log(this.eventBuffer);
		});
		return this.eventBuffer;
	}
}
