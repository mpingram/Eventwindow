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
import { EmEvent } 				from '../../shared/event';

@Component({
	moduleId: module.id,
	selector: 'em-resource-scheduler',
	templateUrl: './resource-scheduler.component.html',
	styleUrls: [ './resource-scheduler.component.css' ],
})

export class ResourceSchedulerComponent implements AfterViewInit, OnChanges, OnInit {

	@Input() resources: String[]; 
	@Input() date: Moment;
	// used to measure height and compute hourInPx
	@ViewChild( 'timeAxis' ) timeAxisElement: ElementRef;
	
	// public properties
	// -----------------------
	public events: EmEvent[];
	public currentDayIsToday: boolean = moment().isSame( this.date, 'day' );

	public firstTimeSlotStart: number;
	public timeSlotList: number[];

	// allows lazy evaluation
	public get timeSlotHeight(): string {
		return this._hourInPx + 'px';
	}

	// private properties
	// ------------------------

	private _viewInitialized = false;
	// TODO: config object to configure default time range
	private _hourInPx: number;

	private _defaultTimeRange: number[] = [ 7, 20 ];
	private _timeRange: number[] = this._defaultTimeRange;
	private _numHoursInRange: number = this._timeRange[1] - this._timeRange[0];
	private _filteredEvents: Object = {};


	// --------------------------
	



	constructor( private eventService: EventService ) { }

	ngOnInit(){
		this.timeSlotList = this.initializeTimeSlotList();
		this.firstTimeSlotStart = this.timeSlotList[ 0 ];
		this._filteredEvents = this.filterEventsByResource();
		console.log( this._filteredEvents );
	}

	ngAfterViewInit(){
		this._viewInitialized = true;
		this._hourInPx = this.measureHourInPixels();
		console.log( this.timeSlotHeight );
	}

	ngOnChanges(){
		this.events = this.eventService.getEventsByDay( this.date );
		this._filteredEvents = this.filterEventsByResource();
	}


	// public methods
	// ----------------------------------------
	public getFilteredEvents( resourceName: string ) : EmEvent[] {
		if ( this._filteredEvents[ resourceName ] !== undefined ){
			return this._filteredEvents[ resourceName ];
		} else {
			return [];
		}
	}

	public calculateEventPixelsFromTop( event:EmEvent ): string {

		if ( this._viewInitialized ) {

			let pixelsFromTop: number;

			const eventStartTime = this.minutesFromMidnight( event.start );
			const minutesFromStart: number = eventStartTime - this.firstTimeSlotStart;
			const hoursFromStart = minutesFromStart / 60;

			pixelsFromTop = hoursFromStart * this._hourInPx;

			console.log( pixelsFromTop );
			return pixelsFromTop + 'px';

		} else {

			return 0 + 'px';
		}

	}

	public calculateEventHeight( event:EmEvent ): string {

		if ( this._viewInitialized ) {

			const eventLengthInMinutes: number = event.end.diff( event.start, 'minutes' );
			const eventLengthInHours: number = eventLengthInMinutes / 60;

			const eventLengthInPx =  eventLengthInHours * this._hourInPx;
			return eventLengthInPx + 'px';

		} else {

			return 0 + 'px';
		}

	}

	public displayClockTimeFromTimeSlot( timeSlotMinutes: number ): string {

		let time = moment().startOf( 'day' );
		time.add( timeSlotMinutes, 'minutes' );
		return time.format( 'h:mm' );

	}


	// private methods
	// --------------------------------------
	// 
	private filterEventsByResource(): Object {
		let filteredEvents: Object = {};

		for ( let i = 0; i < this.events.length; i++ ) {
			// COLOSSAL FIXME: ONLY WORKS WITH PRIMARY RESOURCE
			let eventResource = this.events[i].primaryResource;
			if ( filteredEvents[ eventResource ] === undefined ){
				filteredEvents[ eventResource ] = [];
			}
			filteredEvents[ eventResource ].push( this.events[i] );
		}
		return filteredEvents;
	}

	private measureHourInPixels(): number {
		const columnHeight: number = this.timeAxisElement.nativeElement.offsetHeight;
		return columnHeight / this._numHoursInRange;
	}

	private minutesFromMidnight( time: Moment ): number {
		let midnight = time.clone().startOf( 'day' );
		return time.diff( midnight, 'minutes' );
	}

	private initializeTimeSlotList(): number[] {

		let timeSlotList: number[] = [];

		const firstTimeSlotMoment: Moment = this.date.clone().startOf('day');
		const start = this._timeRange[0];
		const end = this._timeRange[1];

		for (let i = start; i < end; i++ ){
			let timeSlot: Moment = firstTimeSlotMoment.clone();
			timeSlot.add( i, 'hours' );
			timeSlotList.push( this.minutesFromMidnight( timeSlot ) );
		}

		return timeSlotList;
	}

}