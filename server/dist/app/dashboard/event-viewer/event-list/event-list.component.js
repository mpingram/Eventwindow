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
var dashboard_state_service_1 = require('../../shared-dashboard/dashboard-state.service');
var EventListComponent = (function () {
    function EventListComponent(dashboardState) {
        this.dashboardState = dashboardState;
        // ----
        this.days = [];
        // ----
        this._today = moment().startOf('day');
        this._defaultNumDays = 14;
        this.days = this.initializeDays();
    }
    Object.defineProperty(EventListComponent.prototype, "focusedDay", {
        get: function () {
            return this.dashboardState.focusedDay;
        },
        enumerable: true,
        configurable: true
    });
    ;
    // ----
    EventListComponent.prototype.isFocusedDay = function (day) {
        return day.isSame(this.focusedDay, 'day');
    };
    ;
    // ----
    EventListComponent.prototype.initializeDays = function () {
        var numDays = this._defaultNumDays;
        var lastDayIndex = this._defaultNumDays - 1;
        var days = Array(numDays);
        days.fill(undefined);
        var currDay = this._today.clone();
        return days.map(function (day, index) {
            day = currDay.clone();
            currDay.add(1, 'day');
            return day;
        });
    };
    EventListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'em-event-list',
            templateUrl: 'event-list.component.html',
            styleUrls: ['event-list.component.css'],
        }), 
        __metadata('design:paramtypes', [dashboard_state_service_1.DashboardStateService])
    ], EventListComponent);
    return EventListComponent;
}());
exports.EventListComponent = EventListComponent;
//# sourceMappingURL=event-list.component.js.map