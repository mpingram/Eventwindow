import { EventService } from './event.service';

import { TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';

import { Moment } from 'moment';
declare const moment:any;

import { Event } from './event';
import { EventBuffer } from './event-buffer';

// for mocking
import { BackendService } from './backend.service';
import { Logger }					from './logger.service';

 
describe('Isolated tests of EventService', () => {

	let eventService: EventService;
	let logger: Logger = new Logger();
	let backendService: BackendService = new BackendService(logger);
	let mockBackendService: any = {
		
	}


	// covering basic functionality with real-deal service
	describe('with real backendService', () => {

		beforeEach( () => {
			eventService = new EventService(backendService, logger);
		});

		// FIXME: Holy Crockford have patience with my dumb ass
		it('should return an EventBuffer with the same number of original events in it', ( done ) =>{
			
			let start: Moment = moment();
			let end: Moment = start.clone().add(14, 'days');

			function countItems(nestedArray:[][]) :number {
				let numEvents: number = 0;
				for (let i = 0; i < nestedArray.length; i++){
					numEvents += nestedArray[i].length;
				}
				return numEvents;
			}

			// Typescript hack to access private methods
			// Used here due to the fact that each call to backendService.getEvents
			// randomly generates a new set of events
			// FIXME: remove when testing with non-randomly generated backend service
			let convertToBuffer = eventService["convertToBuffer"];

			backendService.getEvents(start, end)
			.then( ( eventArray: Event[] ) => {

				let eventBuffer: EventBuffer = convertToBuffer( eventArray );
				let eventBufferCount: number = countItems(eventBuffer);
				let eventArrayCount: number = eventArray.length;

				expect(eventBufferCount).toEqual(eventArrayCount);

			}).then(done);
		});
	});


	describe('with mock backendService', () => {

		beforeEach( () => {
			eventService = new EventService(mockBackendService, logger);
		})
		// FIXME: implement
		
	});




	
});