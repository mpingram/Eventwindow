var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResourceViewerComponent } from './dashboard/resource-viewer/resource-viewer.component';
import { ResourceSchedulerComponent } from './dashboard/resource-viewer/resource-scheduler.component';
import { ResourceSchedulerItemComponent } from './dashboard/resource-viewer/resource-scheduler-item.component';
import { EventViewerComponent } from './dashboard/event-viewer/event-viewer.component';
import { EventListComponent } from './dashboard/event-viewer/event-list/event-list.component';
import { EventListDayComponent } from './dashboard/event-viewer/event-list/event-list-day.component';
import { EventListItemComponent } from './dashboard/event-viewer/event-list/event-list-item.component';
export let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        imports: [
            BrowserModule,
            routing
        ],
        // FIXME: organize into feature modules? Cut down on the # of components?
        declarations: [
            AppComponent,
            DashboardComponent,
            ResourceViewerComponent,
            ResourceSchedulerComponent,
            ResourceSchedulerItemComponent,
            EventViewerComponent,
            EventListComponent,
            EventListDayComponent,
            EventListItemComponent,
        ],
        providers: [
            appRoutingProviders
        ],
        bootstrap: [AppComponent]
    }), 
    __metadata('design:paramtypes', [])
], AppModule);
//# sourceMappingURL=app.module.js.map