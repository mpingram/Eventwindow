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
import { DashboardStateService } from '../../shared-dashboard/dashboard-state.service';
export let EventListComponent = class EventListComponent {
    constructor(dashboardState) {
        this.dashboardState = dashboardState;
        // ----
        this.days = [];
        // ----
        this._today = moment().startOf('day');
        this._defaultNumDays = 14;
        this.days = this.initializeDays();
    }
    get focusedDay() {
        return this.dashboardState.focusedDay;
    }
    ;
    // ----
    isFocusedDay(day) {
        return day.isSame(this.focusedDay, 'day');
    }
    ;
    // ----
    initializeDays() {
        const numDays = this._defaultNumDays;
        const lastDayIndex = this._defaultNumDays - 1;
        let days = Array(numDays);
        days.fill(undefined);
        let currDay = this._today.clone();
        return days.map((day, index) => {
            day = currDay.clone();
            currDay.add(1, 'day');
            return day;
        });
    }
};
EventListComponent = __decorate([
    Component({
        selector: 'em-event-list',
        templateUrl: './app/dashboard/event-viewer/event-list/event-list.component.html',
        styleUrls: ['./app/dashboard/event-viewer/event-list/event-list.component.css'],
    }), 
    __metadata('design:paramtypes', [DashboardStateService])
], EventListComponent);
//# sourceMappingURL=event-list.component.js.map