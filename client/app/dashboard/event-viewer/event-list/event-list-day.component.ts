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

import { Event }							from '../../../shared/event';
import { EventService } 			from '../../../shared/event.service';

import { Moment }							from 'moment';

@Component({
	moduleId: module.id,
	selector: 'em-event-list-day',
	templateUrl: 'event-list-day.component.html',
	styleUrls: [ 'event-list-day.component.css' ],

	animations [
		trigger('openClosed', [
			state('open', style({ height: '*' })),
			state('closed', style({ height: 0 })),
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
	
	public events: Event[];
	public dropdownState: string;
	public noEvents: boolean;

	public toggleDropdownState(): void {
		if ( this.dropdownState === 'open'){
			this.dropdownState = 'closed';
		} else {
			this.dropdownState = 'open';
		}
	}

	constructor( private eventService: EventService ) { }
	@Input() day: Moment;

	ngOnInit(){
		this.dropdownState = 'open';
		this.events = this.eventService.getEventsByDay( this.day );

		if ( this.events === undefined || this.events.length === 0 ){
			this.noEvents = true;
		}
	}

}