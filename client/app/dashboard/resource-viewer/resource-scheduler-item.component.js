var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { DashboardStateService } from '../shared-dashboard/dashboard-state.service';
export let ResourceSchedulerItemComponent = class ResourceSchedulerItemComponent {
    constructor(dashboardState) {
        this.dashboardState = dashboardState;
    }
    getColorOf(eventType) {
        return this.dashboardState.getColorOf(eventType);
    }
};
__decorate([
    Input(), 
    __metadata('design:type', Object)
], ResourceSchedulerItemComponent.prototype, "event", void 0);
ResourceSchedulerItemComponent = __decorate([
    Component({
        selector: 'em-resource-scheduler-item',
        templateUrl: './app/dashboard/resource-viewer/resource-scheduler-item.component.html',
        styleUrls: ['./app/dashboard/resource-viewer/resource-scheduler-item.component.css'],
    }), 
    __metadata('design:paramtypes', [DashboardStateService])
], ResourceSchedulerItemComponent);
//# sourceMappingURL=resource-scheduler-item.component.js.map