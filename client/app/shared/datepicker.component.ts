import { 	Component, 
					AfterViewInit, 
					ViewChild, 
					ElementRef,
					ViewEncapsulation } from '@angular/core';

import { DatePickerService } from './datepicker.service';

@Component({
	moduleId: module.id,
	selector: 'em-datepicker',
	template: '<div #target class="datepicker"></div>',
	styleUrls: ['styles/datepicker.component.css'],
	providers: [ DatePickerService ],
	encapsulation: ViewEncapsulation.None
})
export class DatePickerComponent implements AfterViewInit {
	
	@ViewChild('target') datepickerElement: ElementRef;

	constructor( private datepicker: DatePickerService ){}

	ngAfterViewInit() {
		this.datepicker.init( this.datepickerElement );
	}
}