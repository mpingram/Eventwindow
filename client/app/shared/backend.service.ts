import { Injectable, Type } from '@angular/core';
import { Logger } from './logger.service';

// FIXME: mock
const EVENTS = [
	new Event('test',1),
	new Event('foo', 2),
	new Event('bar', 4005)
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