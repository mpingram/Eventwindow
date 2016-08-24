import { Component } from '@angular/core';

import { DatePickerComponent } from '../../shared/datepicker.Component';

@Component({
	moduleId: module.id,
	selector: 'em-event-viewer-header',
	templateUrl: 'event-viewer-header.component.html',
	styleUrls: [ 'event-viewer-header.component.css' ],
	directives: [ DatePickerComponent ]
})
export class EventViewerHeaderComponent{

}