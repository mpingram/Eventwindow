import { Injectable, ElementRef } from '@angular/core';

// telling the tsc not to worry
declare const Pikaday: any;

@Injectable()
export class DatePickerService{

	init(element: ElementRef){

		const hackyInputElement = document.createElementNS(null,'input');
		hackyInputElement.setAttributeNS(null, 'style', 'display:none');
		hackyInputElement.setAttributeNS(null, 'type', 'text');

		new Pikaday({
			field: hackyInputElement,
			container: element.nativeElement,
			bound: false,
			onSelect: function(){
				// debug
				console.log(this.getMoment().format('Do MMM YYYY'));
			}
		});
	}
}