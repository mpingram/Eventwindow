import {Component, OnInit } 	from '@angular/core';

import { Event } 							from '../shared/event';
import { EventService }				from '../shared/event.service';
import { BackendService }			from '../shared/backend.service';

import { EventListComponent } from './event-list/event-list.component';

@Component({
	selector: 'em-dashboard',
	templateUrl: './app/dashboard/dashboard.component.html',
	styleUrls: ['./app/dashboard/dashboard.component.css'],
	directives: [ EventListComponent ],
	providers: [ EventService ]
})

export class DashboardComponent implements OnInit {

		events: Event[];

		constructor(private service: EventService) {};

		ngOnInit(){
			this.service.getEvents();
		}
}
