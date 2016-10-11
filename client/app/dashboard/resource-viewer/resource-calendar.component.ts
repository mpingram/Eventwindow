import { Component, 
	Input,
	OnChanges,
	OnInit,
	AfterViewInit,
	ViewChild,
	ElementRef,
} from '@angular/core';


import { Moment } 			from 'moment';
declare const moment: any;

import { EventService } from '../../shared/event.service';
import { Event } 				from '../../shared/event';

@Component({
	moduleId: module.id,
	selector: 'em-resource-calendar',
	templateUrl: './resource-calendar.component.html',
	styleUrls: [ './resource-calendar.component.css' ],
})
export class ResourceCalendarComponent implements AfterViewInit, OnChanges, OnInit {
	
	// ----
	private _events: Event[];
	public get events(): Event[] {	return this._events; }

	private _resources: String[];
	@Input() 
	public set resources ( resources: String[] ) {
		this._resources = resources;
	}
	public get resources (): String[] {
		return this._resources;
	}

	private _timeSlots: Moment[];
	public get timeSlots(): Moment[] {
		return this._timeSlots;
	}

	public timeSlotHeight: string;

	@Input() date: Moment;

	// TODO: config object
	private _defaultTimeRange: number[] = [ 7, 19 ];
	private _numHoursInRange: number = this._defaultTimeRange[1] - this._defaultTimeRange[0];
	// ----
	

	@ViewChild( 'timeAxis' ) timeAxisElement: ElementRef; 

	constructor( private eventService: EventService ) { }

	ngOnInit(){
		this._timeSlots = this.initializeTimeSlots();
	}

	ngAfterViewInit(){
		let height = this.calculateTimeSlotHeight();
		this.timeSlotHeight = height.toString() + 'px';
		console.log(this.timeSlotHeight);
	}

	ngOnChanges(){
		this._events = this.eventService.getEventsByDay( this.date );
	}

	private calculateTimeSlotHeight(): number {
		const columnHeight: number = this.timeAxisElement.nativeElement.offsetHeight;
		return columnHeight / this._numHoursInRange;
	}

	private initializeTimeSlots(): Moment[] {
		let timeSlots: Moment[] = [];
		const firstTimeSlot: Moment = this.date.clone().startOf('day');
		const start = this._defaultTimeRange[0];
		const end = this._defaultTimeRange[1];

		for (let i = start; i < end; i++ ){
			let timeSlot: Moment =  firstTimeSlot.clone();
			timeSlot.add( i, 'hours' );
			timeSlots.push( timeSlot );
		}

		return timeSlots;
	}

}