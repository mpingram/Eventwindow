import { Injectable } from '@angular/core';

import { Moment	} from 'moment';
declare const moment:any;


@Injectable()
export class DashboardStateService {

	public focusedEvent: string = '';
	public focusedDay: Moment = this._today;

	private _today: Moment = moment().startOf('day');
	
}