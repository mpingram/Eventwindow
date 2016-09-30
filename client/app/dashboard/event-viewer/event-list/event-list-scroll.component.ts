import { Component, Input } from '@angular/core';

import { EventListDayComponent } from './event-list-day.component';
import { EventListItemComponent } from './event-list-item.component';
import { EventListMultiItemComponent } from './event-list-multi-item.component';

@Component({
	moduleId: module.id,
	selector: 'em-event-list-scroll',
	directives: [EventListDayComponent, EventListItemComponent, EventListMultiItemComponent],
	templateUrl: 'event-list-scroll.component.html',
	styleUrls: [ 'event-list-scroll.component.css' ]
})
export class EventListScrollComponent{
	@Input() eventBuffer: Event[];
}