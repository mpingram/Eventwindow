import { Component, AfterViewInit, ViewChild, ElementRef, Renderer } from '@angular/core';

import { EventDetailComponent } from './event-detail.component'

@Component({
	selector: 'em-event-viewer',
	templateUrl: './app/dashboard/event-viewer/event-viewer.component.html',
	styleUrls: ['./app/dashboard/event-viewer/event-viewer.component.css'],
	directives: [],
	providers: []
})
export class EventViewerComponent implements AfterViewInit {

	@ViewChild('datepicker')	datepicker: ElementRef;

	constructor(private renderer: Renderer) {}

	ngAfterViewInit() {
		this.renderer.invokeElementMethod(this.datepicker.nativeElement, 'click');
	}
}
