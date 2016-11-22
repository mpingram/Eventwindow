import { Component, 
	Input,
	OnChanges,
	OnInit,
	AfterViewInit,
	ViewChild,
	ElementRef,
} from '@angular/core';

import { Observable } 			from 'rxjs/Observable';
import { GroupedObservable } 	from 'rxjs/operator/groupBy';


import { Moment } 			from 'moment';
declare const moment: any;

import { EventService } from '../../shared/event.service';
import { EmEvent } 				from '../../shared/event';
import { EventList }			from '../../shared/event-list';

import { DashboardStateService } from '../shared-dashboard/dashboard-state.service';

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

	public eventList: EventList;
	public currentDayIsToday: boolean = moment().isSame( this.date, 'day' );

	public firstTimeSlotStart: number;
	public timeSlotList: number[];

	// allows lazy evaluation
	public get timeSlotHeight(): string {

		if ( this._hourInPx !== undefined ){
			return this._hourInPx + 'px';
		} else {
			return '40px';
		}
	}

	

	// public methods
	// ----------------------------------------
	public isFocusedEvent( event: EmEvent ): boolean {
		return this.dashboardState.focusedEvent === event.id;
	}

	public getEventsByResource( resourceName: string ) : EventList {

		return this._eventsGroupedByResource.find(
			( eventGroup: GroupedObservable<string, EmEvent> ) => eventGroup.key === resourceName,
		).flatMap(
			( eventGroup: GroupedObservable<string, EmEvent>) => {
				if ( eventGroup === undefined ) {
					return Observable.from( [] ); 
				} else {
					return Observable.from( eventGroup.toArray() )
				}
			}
		)

	}

	public calculateEventPixelsFromTop( event: EmEvent ): string {

		if ( this._viewInitialized && event !== undefined) {

			let pixelsFromTop: number;

			const eventStartTime = this.minutesFromMidnight( event.start );
			const minutesFromStart: number = eventStartTime - this.firstTimeSlotStart;
			const hoursFromStart = minutesFromStart / 60;

			pixelsFromTop = hoursFromStart * this._hourInPx;

			return pixelsFromTop + 'px';

		} else {

			return 0 + 'px';
		}

	}

	public calculateEventHeight( event:EmEvent ): string {

		if ( this._viewInitialized && event !== undefined ) {

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

	// ==============================================================


	constructor( private eventService: EventService,
								private dashboardState: DashboardStateService ) { }

	ngOnInit(){

		this.timeSlotList = this.initializeTimeSlotList();
		this.firstTimeSlotStart = this.timeSlotList[ 0 ];

		this.eventList = this.eventService.getEventsByDay( this.date );
		this._eventsGroupedByResource = this.groupEventsByResource();
	}

	ngAfterViewInit(){
		this._viewInitialized = true;
		this._hourInPx = this.measureHourInPixels();
	}

	ngOnChanges(){
		this.eventList = this.eventService.getEventsByDay( this.date );
		this._eventsGroupedByResource = this.groupEventsByResource();
	}



	// ===========================================================

	// private properties
	// ------------------------
	private _eventsGroupedByResource: Observable< GroupedObservable<string, EmEvent> >;

	private _viewInitialized = false;

	private _hourInPx: number;
	// TODO: config object to configure default time range
	private _defaultTimeRange: number[] = [ 7, 20 ];
	private _timeRange: number[] = this._defaultTimeRange;
	private _numHoursInRange: number = this._timeRange[1] - this._timeRange[0];
	

	// --------------------------

	// private methods
	// --------------------------------------
	// 
	private groupEventsByResource(): Observable< GroupedObservable <string, EmEvent > > {
		
		return this.eventList.flatMap( 
			( eventArr: EmEvent[] ) => Observable.from( eventArr ) 
		).groupBy(
		  ( event: EmEvent ) => event.primaryResource
		)

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