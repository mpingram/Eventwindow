import { Component } 					from '@angular/core';

import { BackendService } 		from './shared/backend.service';
import { Logger }							from './shared/logger.service';
import { MockEventGeneratorService } from './shared/mock-event-generator.service';

import { DashboardComponent } from './dashboard/dashboard.component';



@Component({
	selector: 'em-app',
	templateUrl: './app/app.component.html',
	styleUrls: [ './app/app.component.css', './app/shared/styles/ionicons.css' ],
	// register utility services for general use
	providers: [BackendService, Logger, MockEventGeneratorService]
})
export class AppComponent { }
