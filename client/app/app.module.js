"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var app_component_1 = require('./app.component');
var app_routing_1 = require('./app.routing');
var dashboard_component_1 = require('./dashboard/dashboard.component');
var resource_viewer_component_1 = require('./dashboard/resource-viewer/resource-viewer.component');
var event_viewer_component_1 = require('./dashboard/event-viewer/event-viewer.component');
var event_list_component_1 = require('./dashboard/event-viewer/event-list/event-list.component');
var event_list_day_component_1 = require('./dashboard/event-viewer/event-list/event-list-day.component');
var event_list_item_component_1 = require('./dashboard/event-viewer/event-list/event-list-item.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_1.routing
            ],
            // FIXME: organize into feature modules? Cut down on the # of components?
            declarations: [
                app_component_1.AppComponent,
                dashboard_component_1.DashboardComponent,
                resource_viewer_component_1.ResourceViewerComponent,
                event_viewer_component_1.EventViewerComponent,
                event_list_component_1.EventListComponent,
                event_list_day_component_1.EventListDayComponent,
                event_list_item_component_1.EventListItemComponent,
            ],
            providers: [
                app_routing_1.appRoutingProviders
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map