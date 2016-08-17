import { Component } 					from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';

import { BackendService } 		from './shared/backend.service';
import { Logger }							from './shared/logger.service';


@Component({
	selector: 'em-app',
	directives: [DashboardComponent],
	templateUrl: './app/app.component.html',
	styleUrls: ['./app/app.component.css'],
	// register utility services
	providers: [BackendService, Logger]
})
export class AppComponent { }
