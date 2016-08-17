import { Component } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
	selector: 'em-app',
	directives: [DashboardComponent],
	templateUrl: './app/app.component.html',
	styleUrls: ['./app/app.component.css']
})
export class AppComponent { }
