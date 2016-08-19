import { Component, ViewEncapsulation } from '@angular/core';

import { DatePickerComponent }  from '../../shared/datepicker.component';

@Component({
	selector: 'em-date-viewer',
	templateUrl: 'app/dashboard/event-viewer/date-viewer.component.html',
	styleUrls: ['app/dashboard/event-viewer/date-viewer.component.css'],
	directives: [ DatePickerComponent ],
	encapsulation: ViewEncapsulation.None
})
export class DateViewerComponent {}