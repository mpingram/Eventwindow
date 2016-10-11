import { Injectable, ElementRef } from '@angular/core';

import { Event }			from './event';
import { Moment }			from 'moment';

// FIXME: is there a better way to do this?
declare const $: any;

@Injectable()
export class FullcalendarWrapperService {

	private _calendarReference;
	private _defaultConfig: Object = {
	}

	public initialize( element: ElementRef ): void {

		$( element.nativeElement ).fullCalendar();

	}

	public update(): void {


	}

}