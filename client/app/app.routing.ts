import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { EventPageComponent } from './eventPage/eventpage.component';

const appRoutes: Routes = [
	{
		path: '',
		redirectTo: 'dashboard',
		pathMatch: 'full'
	},
	{
		path: 'dashboard',
		component: DashboardComponent
	},
	{
		path: 'event/:id',
		component: EventPageComponent
 	}
]

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);