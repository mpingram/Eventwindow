import { Injectable } from '@angular/core';

import { Moment	} from 'moment';
declare const moment:any;


@Injectable()
export class DashboardStateService {

	public focusedEvent: string = '';
	public focusedDay: Moment;

	constructor(){
		this.focusedDay = this._today.clone();
	}
	
	private _today: Moment = moment().startOf('day');
	
}