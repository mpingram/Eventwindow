import { Injectable, Type } from '@angular/core';
import { Logger } from './logger.service';

import { Event } from './event';
import { MockEventGeneratorService } from './mock-event-generator.service';


@Injectable()
export class BackendService {


	constructor(private logger: Logger,
	            // mock
	            public mockGenerator: MockEventGeneratorService
	            ) {}

	
	getAll(type: Type): PromiseLike<any[]> {
		if (type === Event){
			// FIXME: mock
			const EVENTS = this.mockGenerator.generateBuffer(14);
			return Promise.resolve<Event[]>(EVENTS);
		}
		let err = new Error('Cannot get object of this type');
		this.logger.error(err);
		throw err;
	}
}