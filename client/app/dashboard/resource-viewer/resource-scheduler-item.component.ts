import { Component, Input } from '@angular/core';

import { EmEvent } from '../../shared/event';

import { Moment } from 'moment';

@Component({
	moduleId: module.id,
	selector: 'em-resource-scheduler-item',
	templateUrl: './resource-scheduler-item.component.html',
	styleUrls: [ './resource-scheduler-item.component.css' ],
})

export class ResourceSchedulerItemComponent {

	@Input() event: EmEvent;
	@Input() hourInPx: number;
	@Input() rangeStart: Moment;

	/*
	private calculateEventPixelsFromTop( event:EmEvent): number {
		let pixelsFromTop: number;
		// FIXME: this is awful
		// Make sure it's tied to 'top', or else it'll break when given negative numbers,
		// ie if event occurs before range displays
		let timeFromStartOfRange: number = event.start.diff( this.rangeStart, 'minutes' );
		timeFromStartOfRange *= 60;
		pixelsFromTop = timeFromStartOfRange * this.hourInPx;
		return pixelsFromTop;
	}

	private calculateEventHeight( event:EmEvent): number {
		const eventLengthInMinutes: number = event.end.diff( event.start, 'minutes' );
		const eventLengthInHours: number = eventLengthInMinutes * 60;

		return eventLengthInHours * this.hourInPx;
	}
	*/
}