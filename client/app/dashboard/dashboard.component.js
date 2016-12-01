var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { EventService } from '../shared/event.service';
import { DashboardStateService } from './shared-dashboard/dashboard-state.service';
export let DashboardComponent = class DashboardComponent {
    constructor() {
    }
    ;
};
DashboardComponent = __decorate([
    Component({
        selector: 'em-dashboard',
        template: '<em-event-viewer></em-event-viewer> \n <em-resource-viewer></em-resource-viewer>',
        // templateUrl: './app/dashboard/dashboard.component.html',
        styleUrls: ['./app/dashboard/dashboard.component.css'],
        providers: [EventService, DashboardStateService]
    }), 
    __metadata('design:paramtypes', [])
], DashboardComponent);
//# sourceMappingURL=dashboard.component.js.map