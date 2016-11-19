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

import { Moment }							from 'moment';

@Component({
	moduleId: module.id,
	selector: 'em-event-list-day',
	templateUrl: 'event-list-day.component.html',
	styleUrls: [ 'event-list-day.component.css' ],

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
		// debug
		return false;
	}

	public setTodayAsActiveDay( $event: Event ): void {

		if ( ! this.eventListOpen ){
			this.eventListOpen = true;
		}

	}

	public toggleDropdownState( $event: Event ): void {
		// prevent event from triggering setTodayAsActiveDay
		$event.stopPropagation();
		this.eventListOpen = !this.eventListOpen;
	}

	public animationStateFrom( bool: boolean ): string {
		return bool ? 'open' : 'closed';
	}

	public setFocusedEventTo( emEvent: EmEvent): void {
		// FIXME: think re best way to implement this.
		// can use @Output to send a dom event out. Does state become an issue, then?
		// Yeah, it totally does. How does an event-list-item know it's not the
		// focused event any more?
		// Service that manages all this bs / focuses events across different components?
		// Bc it's quite a bridge between the Event-list and the resource-viewer. A lot easier
		// to have events keep an eye on a shared focusedEvent variable that may match their id -
		// also an easy way to implement repeated/grouped events highlighting. That may not even
		// need a service.... OK, share state through object it is. Nvm about the service.

		// NVM you already learned that passing a fucking state variable down the component tree
		// is brittle and dumb. Use a damn service ugh
	}

	constructor( 	private eventService: EventService ) {
	}
	

	ngOnInit(){
		this.eventList = this.eventService.getEventsByDay( this.day );
		this.eventListIsEmpty = this.eventList.isEmpty();
	}

}