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

	@Input() day: Moment;
	
	public eventList: EventList;
	public eventListIsEmpty: Observable<boolean>;
	public dropdownState: string;

	public toggleDropdownState(): void {
		if ( this.dropdownState === 'open'){
			this.dropdownState = 'closed';
		} else {
			this.dropdownState = 'open';
		}
	}

	constructor( private eventService: EventService ) {
		this.dropdownState = 'open';
	}
	

	ngOnInit(){
		this.eventList = this.eventService.getEventsByDay( this.day );
		this.eventListIsEmpty = this.eventList.isEmpty();
	}

}