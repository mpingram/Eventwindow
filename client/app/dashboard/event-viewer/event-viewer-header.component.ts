import { Component } from '@angular/core';

import { DatePickerService } from '../../shared/datepicker.service';

@Component({
	moduleId: module.id,
	selector: 'em-event-viewer-header',
	templateUrl: 'event-viewer-header.component.html',
	styleUrls: [ 'event-viewer-header.component.css' ],
	providers: [ DatePickerService ]
})
export class EventViewerHeaderComponent{

}