import { Component, OnInit } 	from '@angular/core';

import { EmEvent } 							from '../shared/event';
import { EventBuffer }				from '../shared/event-buffer';
import { EventService }				from '../shared/event.service';

import { EventViewerComponent } from './event-viewer/event-viewer.component';
import { ResourceViewerComponent } from './resource-viewer/resource-viewer.component';


@Component({
	selector: 'em-dashboard',
	template: '<em-event-viewer></em-event-viewer> \n <em-resource-viewer></em-resource-viewer>',
	// templateUrl: './app/dashboard/dashboard.component.html',
	styleUrls: ['./app/dashboard/dashboard.component.css'],
	providers: [ EventService ]
})
export class DashboardComponent implements OnInit {


		constructor(private eventService: EventService) {};

		ngOnInit(){
			
		}
}
