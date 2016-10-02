import { EventService } from './event.service';

import { TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';

// for mocking
import { BackendService } from './backend.service';
import { Logger }					from './logger.service';

 
describe('Isolated tests of EventService', () => {
	let eventService: EventService;
	let logger: Logger = new Logger();
	let backendService: BackendService = new BackendService(logger);
	let mockBackendService: any;

	describe('with mock backendService', () => {

		beforeEach( () => {
			eventService = new EventService(mockBackendService as BackendService, logger);
		});

		mockBackendService = {
			getEvents: function(rangeStart, rangeEnd){
				
			}
		}

		it('should work on a basic level', () => {
			
		})

		
	})

	// covering basic functionality with real-deal service
	describe('with real backendService', () => {

		beforeEach( () => {
			eventService = new EventService(backendService, logger);
		});





	});



	
});