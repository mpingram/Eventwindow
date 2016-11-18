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
//import { EmEvent } 							from '../shared/event';
var event_service_1 = require('../shared/event.service');
var DashboardComponent = (function () {
    function DashboardComponent(eventService) {
        this.eventService = eventService;
    }
    ;
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'em-dashboard',
            template: '<em-event-viewer></em-event-viewer> \n <em-resource-viewer></em-resource-viewer>',
            // templateUrl: './app/dashboard/dashboard.component.html',
            styleUrls: ['./app/dashboard/dashboard.component.css'],
            providers: [event_service_1.EventService]
        }), 
        __metadata('design:paramtypes', [event_service_1.EventService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map