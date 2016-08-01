import { Component, OnInit } from '@angular/core';

import { Event }				from '../../shared/event'
import { EventService } from '../../shared/event.service'; 

import { EventDetailComponent } from './event-detail.component'

@Component({
	selector: 'em-event-list',
	templateUrl: 'event-list.component.html',
	directives: [],
	providers: [EventService]
})
export class eventListComponent implements OnInit {
	events: Event[];

	constructor(private service: EventService) {};

	ngOnInit(){
		this.service.getEvents();
	}
}
