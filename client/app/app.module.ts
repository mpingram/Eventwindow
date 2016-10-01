import { NgModule } 					from '@angular/core';
import { BrowserModule } 			from '@angular/platform-browser';

import { AppComponent } 			from './app.component';
import { routing, 
				appRoutingProviders } from './app.routing';

import { DashboardComponent } from './dashboard/dashboard.component';
import { EventPageComponent } from './event-page/eventpage.component';

@NgModule({
	imports: [
		BrowserModule,
		routing
	],
	declarations:[
		AppComponent,
		DashboardComponent,
		EventPageComponent
	],
	providers:[
		appRoutingProviders
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
