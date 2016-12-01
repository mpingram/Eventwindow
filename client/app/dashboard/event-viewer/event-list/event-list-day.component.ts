import {
	Component, 
	OnInit, 
	Input,
	trigger,
	state,
	style,
	transition,
	animate
} from '@angular/core';

import { Observable } 				from 'rxjs/Observable';

import { EmEvent }						from '../../../shared/event';
import { EventList }					from '../../../shared/event-list';
import { EventService } 			from '../../../shared/event.service';

import { DashboardStateService }	from '../../shared-dashboard/dashboard-state.service';

import { Moment }							from 'moment';

@Component({
	selector: 'em-event-list-day',
	templateUrl: './app/dashboard/event-viewer/event-list/event-list-day.component.html',
	styleUrls: [ './app/dashboard/event-viewer/event-list/event-list-day.component.css' ],

	animations: [
		trigger('openClosed', [
			state( 'open', style({ height: '*' })),
			state( 'closed', style({ height: 0 })),
			transition( 'open => closed',
				animate( '350ms ease-in-out' ) 
			),
			transition( 'closed => open',
				animate( '400ms ease-in-out' )
			),
		])
	],

})
export class EventListDayComponent implements OnInit {

	@Input() day: Moment;
	
	public eventList: EventList;
	public eventListIsEmpty: Observable<boolean>;
	public eventListOpen: boolean = true;

	public isFocusedEvent( event: EmEvent ): boolean {
		return this.dashboardState.focusedEvent === event.id;
	}

	public setActiveDay( day: Moment ): void {
		this.dashboardState.focusedDay = day;
	}

	public dayHeaderClickHandler(): void {
		
		// open event list if closed
		if ( this.eventListOpen === false  ){
			this.eventListOpen = true;
		}
		// set active day
		this.setActiveDay( this.day );
	}

	public toggleDropdownState( domEvent?: Event ): void {
		
		if ( domEvent !== undefined ){
			// prevent event from triggering setTodayAsActiveDay
			domEvent.stopPropagation();
		} 
		this.eventListOpen = !this.eventListOpen;
	}

	public animationStateFrom( bool: boolean ): string {
		return bool ? 'open' : 'closed';
	}

	public toggleFocusedEvent( event: EmEvent ){
		if ( this.dashboardState.focusedEvent === event.id ){
			this.unsetFocusedEvent();
		} else {
			this.setActiveDay( event.start );
			this.setFocusedEventTo( event );
		}
	}


	constructor( 	private eventService: EventService,
								private dashboardState: DashboardStateService ) {
	}
	

	ngOnInit(){
		this.eventList = this.eventService.getEventsByDay( this.day );
		this.eventListIsEmpty = this.eventList.isEmpty();
	}

	private setFocusedEventTo( emEvent: EmEvent): void {
		this.dashboardState.focusedEvent = emEvent.id;
	}

	private unsetFocusedEvent(): void {
		this.dashboardState.focusedEvent = '';
	}

}