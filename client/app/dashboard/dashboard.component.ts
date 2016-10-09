import { Component, OnInit } 	from '@angular/core';

import { Event } 							from '../shared/event';
import { EventBuffer }				from '../shared/event-buffer';
import { EventService }				from '../shared/event.service';

import { EventViewerComponent } from './event-viewer/event-viewer.component';
import { ResourceViewerComponent } from './resource-viewer/resource-viewer.component';


@Component({
	selector: 'em-dashboard',
	templateUrl: './app/dashboard/dashboard.component.html',
	styleUrls: ['./app/dashboard/dashboard.component.css'],
	providers: [ EventService ]
})
export class DashboardComponent implements OnInit {


		constructor(private eventService: EventService) {};

		ngOnInit(){
			
		}
}
