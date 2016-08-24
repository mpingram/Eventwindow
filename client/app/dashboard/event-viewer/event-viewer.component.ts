import { 	Component } from '@angular/core';

import { EventViewerListComponent } from './event-viewer-list.component';
import { EventViewerHeaderComponent } 	from './event-viewer-header.component';

@Component({
	selector: 'em-event-viewer',
	templateUrl: './app/dashboard/event-viewer/event-viewer.component.html',
	styleUrls: ['app/dashboard/event-viewer/event-viewer.component.css',
							'app/shared/styles/datepicker.component.css'],
	directives: [ EventViewerListComponent, EventViewerHeaderComponent ],
	providers: []
})
export class EventViewerComponent {
	
}
