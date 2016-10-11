import { Component, 
	Input, 
	OnInit, 
	OnChanges,
	ElementRef,
	ViewChild
} from '@angular/core';

import { Moment } 			from 'moment';

import { SchedulerService } from '../../shared/scheduler.service';
import { EventService } from '../../shared/event.service';
import { Event } 				from '../../shared/event';

// FIXME: better way?
declare const $: any;

@Component({
	moduleId: module.id,
	selector: 'em-resource-calendar',
	templateUrl: './resource-calendar.component.html',
	styleUrls: [ '../../shared/styles/fullcalendar.css' ],
	providers: [ SchedulerService ]
})
export class ResourceCalendarComponent implements OnInit, OnChanges {

	private _events: Event[];

	public get events(): Event[] {
		return this._events;
	}

	constructor( private eventService: EventService,
								private scheduler: SchedulerService ) { }

	@Input() date: Moment;
	
	ngOnInit(){

		this.scheduler.initialize();

	}

	ngOnChanges(){

		this._events = this.eventService.getEventsByDay( this.date );
		this.scheduler.update();

	}

}