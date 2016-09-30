import { Component, Input } from '@angular/core';

declare const moment: any;

@Component({
	moduleId: module.id,
	selector: 'em-event-list-item',
	templateUrl: 'event-list-item.component.html',
	styleUrls: ['event-list-item.component.css']
})
export class EventListItemComponent{
	@Input() event = Event;

	dateToClockTime(momentObj){
		return momentObj.format('h mm')
	}
	dateToAMPM(momentObj){
		return momentObj.format('a');
	}
}