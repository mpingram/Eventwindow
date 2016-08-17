import {Component, OnInit } 	from '@angular/core';

import { Event } 							from '../shared/event';
import { EventService }				from '../shared/event.service';
import { BackendService }			from '../shared/backend.service';

import {eventListComponent} from './event-list/event-list.component.ts';

@Component({
	selector: 'em-dashboard',
	templateUrl: './app/dashboard/dashboard.component.html',
	directives: [],
	providers: [ EventService ]
})

export class DashboardComponent implements OnInit {

		events: Event[];

		constructor(private service: EventService) {};

		ngOnInit(){
			this.service.getEvents();
		}
}
