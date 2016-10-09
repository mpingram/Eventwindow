import { Component, OnInit, Input } from '@angular/core';

import { Event }							from '../../../shared/event';
import { EventService } 			from '../../../shared/event.service';

import { Moment }							from 'moment';

@Component({
	moduleId: module.id,
	selector: 'em-event-list-day',
	templateUrl: 'event-list-day.component.html',
	styleUrls: [ 'event-list-day.component.css']
})
export class EventListDayComponent implements OnInit {
	// TODO: handle logic if events = undefined don't display
	// component. Should that be handled in the template?
	
	public events: Event[];

	constructor( private eventService: EventService ) { }


	@Input() day: Moment;

	ngOnInit(){

		this.events = this.eventService.getEventsByDay( this.day );

	}
}