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


	let mockBackendService: any;

	let start: Moment;
	let end: Moment;

	// covering basic functionality with real-deal service
	describe('with real backendService', () => {

		let eventBuffer: EventBuffer;

		beforeEach( () => {
			eventService = new EventService(backendService, logger);
			// FIXME: doesn't work for whatever reason
			start = moment();
			end = start.clone().add(14,'days');
			eventBuffer = eventService.loadEventBuffer(start,end);
			});


		it('should return an EventBuffer with the same number of original events in it', ( done ) =>{


			function test(eventArray: Event[]){

				let numEvents: number = 0;
				let expectedNumEvents: number = eventArray.length;

				for (let i = 0; i < eventBuffer.length; i++){
					numEvents += eventBuffer[i].length;			
				}

				let condition: boolean = numEvents === expectedNumEvents;
				expect(condition).toBe(true);
			}

		  function failTest(error){
				expect(error).toBeUndefined();
			}

			backendService.getEvents(start,end)
				.then( test )
				.catch( failTest )
				.then( done );
			});

		});




	describe('with mock backendService', () => {


		// FIXME: implement
		
	});




	
});