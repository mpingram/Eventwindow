import { 	Component } from '@angular/core';

import { EventDetailComponent } from './event-detail.component';
import { DateViewerComponent } 	from './date-viewer.component';

@Component({
	selector: 'em-event-viewer',
	templateUrl: './app/dashboard/event-viewer/event-viewer.component.html',
	styleUrls: ['app/dashboard/event-viewer/event-viewer.component.css',
							'app/shared/styles/datepicker.component.css'],
	directives: [ DateViewerComponent ],
	providers: []
})
export class EventViewerComponent {
}
