import { Component } 	from '@angular/core';

//import { EmEvent } 							from '../shared/event';
import { EventService }				from '../shared/event.service';
import { DashboardStateService } from './shared-dashboard/dashboard-state.service';

import { EventViewerComponent } from './event-viewer/event-viewer.component';
import { ResourceViewerComponent } from './resource-viewer/resource-viewer.component';



@Component({
	selector: 'em-dashboard',
	template: '<em-event-viewer></em-event-viewer> \n <em-resource-viewer></em-resource-viewer>',
	// templateUrl: './app/dashboard/dashboard.component.html',
	styleUrls: ['./app/dashboard/dashboard.component.css'],
	providers: [ EventService, DashboardStateService ]
})
export class DashboardComponent {


		constructor() {};

}
