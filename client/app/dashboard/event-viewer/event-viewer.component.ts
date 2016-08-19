import { 	Component } from '@angular/core';

import { EventDetailComponent } from './event-detail.component'
import { DatePickerComponent }  from '../../shared/datepicker.component';

@Component({
	selector: 'em-event-viewer',
	templateUrl: './app/dashboard/event-viewer/event-viewer.component.html',
	styleUrls: ['./app/dashboard/event-viewer/event-viewer.component.css'],
	directives: [ DatePickerComponent ],
	providers: []
})
export class EventViewerComponent {
}
