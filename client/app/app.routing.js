import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
const appRoutes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    }
];
export const appRoutingProviders = [];
export const routing = RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map