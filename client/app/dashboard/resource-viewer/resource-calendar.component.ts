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
	
	// properties
	// -----------------------
	
	public events: Event[];

	private _timeSlotList: Moment[];
	public get timeSlotList(): Moment[] {
		return this._timeSlotList.slice( this._timeRange[0], this._timeRange[1] );
	}

	private _hourInPx: number;

	private _timeSlotHeight: number;
	public get timeSlotHeight(){
		if ( this._timeSlotHeight !== undefined ){
			return this._timeSlotHeight.toString() + 'px';
		}
	}


	// TODO: config object
	private _defaultTimeRange: number[] = [ 7, 20 ];
	private _timeRange: number[] = this._defaultTimeRange;
	private _numHoursInRange: number = this._timeRange[1] - this._timeRange[0];


	@Input() resources: String[]; 
	@Input() date: Moment;


	@ViewChild( 'timeAxis' ) timeAxisElement: ElementRef;

	// --------------------------
	



	constructor( private eventService: EventService ) { }

	ngOnInit(){
		this.initialize();
	}

	ngAfterViewInit(){
		this._hourInPx = this.measureHourInPixels();
		this._timeSlotHeight = this._hourInPx;
	}

	ngOnChanges(){
		this.events = this.eventService.getEventsByDay( this.date );
	}



	// private methods
	// --------------------------------------
	private initialize(): void {
		this._timeSlotList = this.initializeTimeSlotList();
	}

	private measureHourInPixels(): number {

		const columnHeight: number = this.timeAxisElement.nativeElement.offsetHeight;
		return columnHeight / this._numHoursInRange;
	}

	private initializeTimeSlotList(): Moment[] {
		let timeSlotLookup: Moment[] = [];
		const firstTimeSlot: Moment = this.date.clone().startOf('day');
		const start = this._timeRange[0];
		const end = this._timeRange[1];

		for (let i = start; i < end; i++ ){
			let timeSlot: Moment =  firstTimeSlot.clone();
			timeSlot.add( i, 'hours' );
			timeSlotLookup[i] = timeSlot;
		}
		return timeSlotLookup;
	}


	private displayEvent( event: Event ): void {

		// match event to resource column
		
		// calculate dimensions
		const pxFromTop = this.calculateEventPixelsFromTop( event );
		const height = this.calculateEventHeight( event );
		

		// create DOM element or draw SVG element, with hooks for 
		// executing functions on click

	}

	private calculateEventPixelsFromTop( event: Event ): number {
		let pixelsFromTop: number;
		// FIXME: this is awful
		let timeFromStartOfRange: number = event.start.diff( this.timeSlotList[0], 'minutes' );
		timeFromStartOfRange *= 60;
		pixelsFromTop = timeFromStartOfRange * this._hourInPx;
		return pixelsFromTop;
	}

	private calculateEventHeight( event: Event ): number {
		const eventLengthInMinutes: number = event.end.diff( event.start, 'minutes' );
		const eventLengthInHours: number = eventLengthInMinutes * 60;

		return eventLengthInHours * this._hourInPx;
	}

	private updateEvents( events: Event[] ): void {

		let len = events.length;
		for ( let i = 0; i < len; i++ ){
			this.displayEvent( events[i] );
		}

	}
}