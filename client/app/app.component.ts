import { Component } 					from '@angular/core';

import { BackendService } 		from './shared/backend.service';
import { Logger }							from './shared/logger.service';

import { DashboardComponent } from './dashboard/dashboard.component';



@Component({
	selector: 'em-app',
	directives: [ DashboardComponent ],
	templateUrl: './app/app.component.html',
	styleUrls: [ './app/app.component.css' ],
	// register utility services for general use
	providers: [BackendService, Logger]
})
export class AppComponent { }
