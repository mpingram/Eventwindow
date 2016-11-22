import { Component, Input, HostBinding } from '@angular/core';

import { EmEvent } from '../../shared/event';

import { DashboardStateService } from '../shared-dashboard/dashboard-state.service';

import { Moment } from 'moment';

@Component({
	moduleId: module.id,
	selector: 'em-resource-scheduler-item',
	templateUrl: './resource-scheduler-item.component.html',
	styleUrls: [ './resource-scheduler-item.component.css' ],
})

export class ResourceSchedulerItemComponent {

	@Input() event: EmEvent;
	@HostBinding( 'class.focused' ) hostFocused : boolean = this.isFocusedEvent;

	public get isFocusedEvent(): boolean {
		if ( this.event !== undefined ){ 
			return this.dashboardState.focusedEvent === this.event.id;
		}
	}  

	public getColorOf( eventType: string ): string {
		return this.dashboardState.getColorOf( eventType );
	}

	constructor( private dashboardState: DashboardStateService ) {

	}


	
}