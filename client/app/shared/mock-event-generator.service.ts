import { Injectable, Type } from '@angular/core';

import { Event } from './event';

declare const moment: any;

@Injectable()
export class MockEventGeneratorService{
	
	constructor(){}

	private eventTitlePool: string[] = ['Rap', 'Classical Music', 'Sting and the Police', 'Baby', 'Pillow', 'Chromolithograph', 'Men', 'Bath', 'German', 'Grasshopper', 'Peer-to-Peer', 'Forestry', 'Paramedic', 'Hot Doctor', 'Jellyfish', 'Angry Bears', 'Intersectionality', 'Shirt', 'Astronaut', 'Duck', 'Fashion', 'Gentrification', 'Yoga', 'Dance', 'Balloon'];
	private eventSubtitlePool: string[] = ['Conference', 'Discussion', 'Lecture', 'Meeting', 'Round Table', 'Viewing', 'Competition', 'Battle', ': an Exploration', 'and the Sorcerer\'s Stone', 'Class', 'Intervention', '-splaining', 'Brunch', 'Coast to Coast', 'Meditation', 'Fight', 'Teleconference', 'Reading', 'Punching', 'Dissection', 'Marathon'];
	private firstNamePool: string[] = ['Richard', 'Flingus','Sid','Ebenezer', 'Rocky', 'Dontae', 'Margarette', 'Robin', 'Willow', 'Ola', 'Bonnie', 'Nicole', 'Diana', 'Dianna', 'Diananana', 'Michael', 'Jareth'];
	private lastNamePool: string[] = ['Nye', 'Hatfield', 'Herring', 'Ingram', 'Lee', 'Li', 'Heaton', 'Cohen', 'Tomlinson', 'Brenner', 'Butler', 'King', 'Morris', 'Bungleton', 'Powerhat', 'Dolphin', 'the Goblin King', 'Goethe', 'Yang', 'Brown', 'Foghorn', 'Colton', 'Dongus'];
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

	private generateEvent(start: any, end: any, availResources: string[]){
		let params = {};
		params.id = Math.ceil(Math.random()*1000);
		params.name = this.generateEventName();
		params.organizer = this.generateHumanName();
		params.start = start;
		params.end 	= end;
		params.primaryResource = this.selectFrom(availResources);

		let event = new Event(params);
		return event;
	}

	generateBuffer(length: number){
		
		let buffer: Event[] = [];

		let currentDay = moment().startOf('day');

		for (let i = 0; i < length; i++){

			for (let startTime = 8; startTime < 16; startTime += 4){
				
				let start = currentDay.clone().hour(startTime);
				let end = start.clone().add(2,'hours');
				let availResources = this.shallowCopyArray(this.resourcesPool);

				while (Math.random() > 0.1){
					let event = this.generateEvent(start, end, availResources);
					buffer.push(event);
				}
			}
			currentDay.add(1, 'day');
		}

		return buffer;
	}
}