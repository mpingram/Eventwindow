import { Component } from '@angular/core';

import { EventListItemComponent } from './event-list-item.component';

@Component({
	moduleId: module.id,
	selector: 'em-event-viewer-list',
	templateUrl: 'event-viewer-list.component.html',
	styleUrls: [ 'event-viewer-list.component.css' ],
	directives: [EventListItemComponent]
})
export class EventViewerListComponent{

}