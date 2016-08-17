import { Injectable } from '@angular/core';

import { Event } from './event';

import { BackendService } from './backend.service';
import { Logger } from './logger.service';

@Injectable()
export class EventService {

	private events: Event[] = [];

	constructor(
		private backend: BackendService,
		private logger: Logger ) { }

	getEvents(){
		this.backend.getAll(Event).then( (events: Event[]) => {
			this.logger.log(`Fetched ${events.length} events.`);
			this.events.push(...events);
		});
		return this.events;
	}
}
