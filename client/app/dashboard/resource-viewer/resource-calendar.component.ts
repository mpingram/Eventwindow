import { Component, 
	Input, 
	OnInit, 
	OnChanges,
	ElementRef,
	ViewChild
} from '@angular/core';

import { Moment } 			from 'moment';

import { FullcalendarWrapperService } from '../../shared/fullcalendar-wrapper.service'
import { EventService } from '../../shared/event.service';
import { Event } 				from '../../shared/event';

// FIXME: better way?
declare const $: any;

@Component({
	moduleId: module.id,
	selector: 'em-resource-calendar',
	templateUrl: './resource-calendar.component.html',
	styleUrls: [ '../../shared/styles/fullcalendar.css' ],
	providers: [ FullcalendarWrapperService ]
})
export class ResourceCalendarComponent implements OnInit, OnChanges {

	private _events: Event[];

	public get events(): Event[] {
		return this._events;
	}

	constructor( private eventService: EventService,
								private fullcalendar: FullcalendarWrapperService ) { }

	@Input() date: Moment;
	@ViewChild( 'calendar' ) calendarElement: ElementRef;
	
	ngOnInit(){
		this.fullcalendar.initialize( this.calendarElement );
	}

	ngOnChanges(){
		this._events = this.eventService.getEventsByDay( this.date );
		this.fullcalendar.update();
	}

}