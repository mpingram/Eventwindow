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
var dashboard_state_service_1 = require('../shared-dashboard/dashboard-state.service');
var ResourceSchedulerItemComponent = (function () {
    function ResourceSchedulerItemComponent(dashboardState) {
        this.dashboardState = dashboardState;
    }
    ResourceSchedulerItemComponent.prototype.getColorOf = function (eventType) {
        return this.dashboardState.getColorOf(eventType);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ResourceSchedulerItemComponent.prototype, "event", void 0);
    ResourceSchedulerItemComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'em-resource-scheduler-item',
            templateUrl: './resource-scheduler-item.component.html',
            styleUrls: ['./resource-scheduler-item.component.css'],
        }), 
        __metadata('design:paramtypes', [dashboard_state_service_1.DashboardStateService])
    ], ResourceSchedulerItemComponent);
    return ResourceSchedulerItemComponent;
}());
exports.ResourceSchedulerItemComponent = ResourceSchedulerItemComponent;
//# sourceMappingURL=resource-scheduler-item.component.js.map