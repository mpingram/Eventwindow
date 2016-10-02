import { Injectable, Type } from '@angular/core';
import { Moment }						from 'moment';
//declare const moment:any;

import { Event } from './event';

import { Logger } from './logger.service';

// FIXME: unnecessary once getAll method removed
declare const moment:any;

// FIXME: mock
@Injectable()
export class BackendService {


	constructor(private logger: Logger) {}

	public getEvents(rangeStart: Moment, rangeEnd: Moment): Promise<Event[]> {
		if( rangeStart.isBefore(rangeEnd) ){
			const errorMessage = 'The first Moment date must come before the second Moment date in the range passed to backendService.getEvents';
			return Promise.reject<Event[]>(errorMessage);

		} else {
			const EVENTS = this.generateEventArray(rangeStart, rangeEnd);
			return Promise.resolve<Event[]>(EVENTS);
		}
	}

	public getAll(type: Type<any>, inRange: number): Promise<any[]> {
		this.logger.warn('backendService.getAll is deprecated.');
		if (type === Event){
			let rangeStart = moment();
			let rangeEnd = rangeStart.clone().add(inRange, 'days');
			const EVENTS = this.generateEventArray(rangeStart, rangeEnd);
			return Promise.resolve<Event[]>(EVENTS);
		}
		let err = new Error('Cannot get object of this type');
		this.logger.error(err);
		throw err;
	}


	// event generator
	// ------------------------
	private eventTitlePool: string[] = ['Rap', 'Classical Music', 'Sting and the Police', 'Baby', 'Pillow', 'Chromolithograph', 'Men', 'Bath', 'German', 'Grasshopper', 'Peer-to-Peer', 'Forestry', 'Paramedic', 'Hot Doctor', 'Jellyfish', 'Angry Bears', 'Intersectionality', 'Shirt', 'Astronaut', 'Duck', 'Fashion', 'Gentrification', 'Yoga', 'Dance', 'Balloon'];
	private eventSubtitlePool: string[] = ['in the Hood', 'Burlesque', 'Conference', 'Discussion', 'Lecture', 'Meeting', 'Round Table', 'Viewing', 'Competition', 'Battle', ': an Exploration', 'and the Sorcerer\'s Stone', 'Class', 'Intervention', '-splaining', 'Brunch', 'Coast to Coast', 'Meditation', 'Fight', 'Teleconference', 'Reading', 'Punching', 'Dissection', 'Marathon'];
	private firstNamePool: string[] = ['Richard', 'Flingus','Sid','Ebenezer', 'Rocky', 'Dontae', 'Margarette', 'Robin', 'Willow', 'Ola', 'Bonnie', 'Nicole', 'Diana', 'Dianna', 'Diananana', 'Michael', 'Jareth'];
	private lastNamePool: string[] = ['Nye', 'Hatfield', 'Herring', 'Lee', 'Li', 'Heaton', 'Cohen', 'Tomlinson', 'Brenner', 'Butler', 'King', 'Morris', 'Bungleton', 'Powerhat', 'Dolphin', 'the Goblin King', 'Goethe', 'Yang', 'Brown', 'Foghorn', 'Colton', 'Dongus'];
	private resourcesPool: string[] = ['EI', 'EII', 'EIII','EIV', 'WIa', 'WIb', 'WII', 'WIII', 'WIV', 'Lobby', 'Library', '120', '129'];
	private eventTypePool: string[] = ['Class', 'Meeting', 'Internal Event', 'External Event'];

	private selectFrom(arr: any[]){
		const len = arr.length;
		const selection = Math.floor(Math.random()*len)
		return arr[selection];
	}

	private selectFromAndRemove(arr: any[]){
		const len = arr.length;
		const selection = Math.floor(Math.random()*len);
		let output = arr[selection];
		// side effect: remove selection from array
		arr = arr.slice(0,selection).concat(arr.slice(selection+1));
	}

	private shallowCopyArray(arr: any[]){
		return arr.slice();
	}

	private generateHumanName(){
		return this.selectFrom(this.firstNamePool) + ' ' + this.selectFrom(this.lastNamePool);
	}
	private generateEventName(){
		return this.selectFrom(this.eventTitlePool) + ' ' + this.selectFrom(this.eventSubtitlePool);
	}

	private generateEvent(start: Moment, end: Moment, availResources: string[]): Event {

		let event: Event = new Event();
		event.id = Math.ceil(Math.random()*1000);
		event.name = this.generateEventName();
		event.organizer = this.generateHumanName();
		event.start = start;
		event.end 	= end;
		event.primaryResource = this.selectFrom(availResources);

		return event;
	}

	private generateEventArray(rangeStart: Moment, rangeEnd: Moment): Event[] {
		
		let events: Event[] = [];

		// set rangeStart to 12am on day of rangeStart,
		// set rangeEnd to 11:59pm on day of rangeEnd
		rangeStart.startOf('day');
		rangeEnd.endOf('day');

		let currentDay = rangeStart.clone();

		while( currentDay.isBefore(rangeEnd) ) {

			for (let startTime = 8; startTime < 16; startTime += 4){
				let availResources = this.shallowCopyArray(this.resourcesPool);
				let eventStart = currentDay.clone();
				let eventEnd = currentDay.clone();

				eventStart.hour(startTime);
				eventEnd.hour(startTime).add(2,'hours');
				
				while (Math.random() > 0.1){
					let event = this.generateEvent(eventStart, eventEnd, availResources);
					events.push(event);
				}
			}

			// increment while loop
			currentDay.add(1,'day');
		}

		return events;
	}

}


