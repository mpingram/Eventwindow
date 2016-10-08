import { Injectable, Type } from '@angular/core';
import { Observable }				from 'rxjs/Observable';

import { Moment }						from 'moment';

import { Event } 						from './event';

import { Logger } 					from './logger.service';


// FIXME: mock
@Injectable()
export class BackendService {


	constructor(private logger: Logger) {}

	public getEvents(rangeStart: Moment, rangeEnd: Moment): Observable<Event> {

		let eventObservable: Observable<Event>;

		if( rangeStart.isAfter(rangeEnd) ){
			const errorMessage = 'Incorrect Moment arguments @ backendService.getEvents';
			eventObservable = Observable.throw(errorMessage);
		} else {
			let eventArray: Event[] = this.generateEventArray( rangeStart, rangeEnd ); 
			eventObservable = Observable.from( eventArray );
			this.logger.log( `Fetched ${ eventArray.length } events` );
		}

		return eventObservable;
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

		let event: Event = {

			id: 							Math.ceil(Math.random()*1000),
			name:							this.generateEventName(),
			organizer: 				this.generateHumanName(),
			start:						start,
			end : 						end,
			repeating: 				false,

			primaryResource: 	this.selectFrom(availResources)

		}
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


