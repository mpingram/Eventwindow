import {Component, OnInit } 	from '@angular/core';

import { Event } 							from '../shared/event';
import { EventBuffer }				from '../shared/event-buffer';
import { EventService }				from '../shared/event.service';

import { EventViewerComponent } from './event-viewer/event-viewer.component';
import { ResourceViewerComponent } from './resource-viewer/resource-viewer.component';

declare const moment:any;

@Component({
	selector: 'em-dashboard',
	templateUrl: './app/dashboard/dashboard.component.html',
	styleUrls: ['./app/dashboard/dashboard.component.css'],
	providers: [ EventService ]
})
export class DashboardComponent implements OnInit {

		public eventBuffer: EventBuffer;

		constructor(private eventService: EventService) {};

		ngOnInit(){
			// FIXME
			let start = moment();
			let end = start.clone().add(14,'days');
			this.eventBuffer = this.eventService.loadEventBuffer(start, end);
		}
}
