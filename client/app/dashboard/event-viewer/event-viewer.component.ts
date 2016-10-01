import { 	Component, Input } from '@angular/core';

import { EventListComponent } from './event-list/event-list.component';

@Component({
	moduleId: module.id,
	selector: 'em-event-viewer',
	templateUrl: 'event-viewer.component.html',
	styleUrls: ['event-viewer.component.css',
							'../../shared/styles/datepicker.component.css'],
	providers: []
})
export class EventViewerComponent {
	@Input() eventBuffer: Event[][];
}
