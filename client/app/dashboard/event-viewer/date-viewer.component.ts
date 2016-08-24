import { Component, ViewEncapsulation } from '@angular/core';

import { DatePickerComponent }  from '../../shared/datepicker.component';

@Component({
	moduleId: module.id,
	selector: 'em-date-viewer',
	templateUrl: 'date-viewer.component.html',
	styleUrls: ['date-viewer.component.css'],
	directives: [ DatePickerComponent ],
})
export class DateViewerComponent {}