import { Component } from '@angular/core';

import { EventListScrollComponent } from './event-list-scroll.component';
@Component({
	moduleId: module.id,
	selector: 'em-event-list',
	templateUrl: 'event-list.component.html',
	styleUrls: [ 'event-list.component.css' ],
	directives: [ EventListScrollComponent ]
})
export class EventListComponent{

}