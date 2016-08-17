import { Injectable, Type } from '@angular/core';
import { Logger } from './logger.service';

import { Event } from './event';

// TODO: replace mock with backend interface
const EVENTS = [
	new Event('test'),
	new Event('foo'),
	new Event('bar')
]

@Injectable()
export class BackendService {

	constructor(private logger: Logger) {}

	//private lastEvent: Date
	
	getAll(type: Type): PromiseLike<any[]> {
		if (type === Event){
			// FIXME: mock
			return Promise.resolve<Event[]>(EVENTS);
		}
		let err = new Error('Cannot get object of this type');
		this.logger.error(err);
		throw err;
	}
}