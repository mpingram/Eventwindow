import { Component } from '@angular/core';

import { EventListItemComponent } from './event-list-item.component';
import { EventListDayComponent } from './event-list-day.component';
@Component({
	moduleId: module.id,
	selector: 'em-event-list',
	templateUrl: 'event-list.component.html',
	styleUrls: [ 'event-list.component.css' ],
	directives: [ EventListItemComponent, EventListDayComponent ]
})
export class EventListComponent{

}