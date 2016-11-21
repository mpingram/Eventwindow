import { Component, Input } from '@angular/core';
import { EmEvent } from '../../../shared/event';

import { DashboardStateService } from '../../shared-dashboard/dashboard-state.service';

declare const moment: any;

@Component({
	moduleId: module.id,
	selector: 'em-event-list-item',
	templateUrl: 'event-list-item.component.html',
	styleUrls: ['event-list-item.component.css']
})
export class EventListItemComponent{

	@Input() event: EmEvent;

	public openEventDetail( $event ): void {
		$event.stopPropagation();
		// DEBUG
		console.log( JSON.stringify( this.event, null, 4 ) );
	}

	public dateToClockTime(momentObj): string {
		return momentObj.format('h:mm')
	}

	public dateToAMPM(momentObj): string {
		return momentObj.format('a');
	}


}