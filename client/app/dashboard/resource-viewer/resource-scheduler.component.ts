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
	
	// properties
	// -----------------------
	
	public events: EmEvent[];

	private _timeSlotList: Moment[];
	public get timeSlotList(): Moment[] {
		return this._timeSlotList;
		//return this._timeSlotList.slice( this._timeRange[0], this._timeRange[1] );
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

	private _filteredEvents: Object = {};


	@Input() resources: String[]; 
	@Input() date: Moment;

	@ViewChild( 'timeAxis' ) timeAxisElement: ElementRef;

	// --------------------------
	



	constructor( private eventService: EventService ) { }

	ngOnInit(){
		this._timeSlotList = this.initializeTimeSlotList();
		this._filteredEvents = this.filterEventsByResource();
		console.log( this._filteredEvents );
	}

	ngAfterViewInit(){
		this._hourInPx = this.measureHourInPixels();
		this._timeSlotHeight = this._hourInPx;
	}

	ngOnChanges(){
		this.events = this.eventService.getEventsByDay( this.date );
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
			filteredEvents[ eventResource ].push( event );
		}
		return filteredEvents;
	}

	private measureHourInPixels(): number {
		const columnHeight: number = this.timeAxisElement.nativeElement.offsetHeight;
		return columnHeight / this._numHoursInRange;
	}

	private initializeTimeSlotList(): Moment[] {
		let timeSlotList: Moment[] = [];
		const firstTimeSlot: Moment = this.date.clone().startOf('day');
		const start = this._timeRange[0];
		const end = this._timeRange[1];

		for (let i = start; i < end; i++ ){
			let timeSlot: Moment =  firstTimeSlot.clone();
			timeSlot.add( i, 'hours' );
			timeSlotList.push( timeSlot );
		}
		return timeSlotList;
	}

}