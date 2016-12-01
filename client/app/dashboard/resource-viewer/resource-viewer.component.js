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
import { DashboardStateService } from '../shared-dashboard/dashboard-state.service';
export let ResourceViewerComponent = class ResourceViewerComponent {
    constructor(dashboardState) {
        this.dashboardState = dashboardState;
        this.resources = this.generateResources();
        // private properties
        // ------------------------------------------
        this._today = moment().startOf('day');
        this._date = this.dashboardState.focusedDay.clone();
    }
    // public properties
    // --------------------------------------
    get currentDayIsToday() {
        return this._today.isSame(this._date, 'day');
    }
    get date() {
        return this.dashboardState.focusedDay.clone();
    }
    // public methods
    // --------------------------------------
    nextDay() {
        this._date.add(1, 'day');
        this.setFocusedDay(this._date);
    }
    prevDay() {
        this._date.subtract(1, 'day');
        this.setFocusedDay(this._date);
    }
    goToDate(targetDate) {
        this._date = targetDate.clone();
        this.setFocusedDay(this._date);
    }
    goToToday() {
        if (!this.currentDayIsToday) {
            this._date = this._today.clone();
            this.setFocusedDay(this._date);
        }
    }
    ;
    // private methods
    // ------------------------------------------
    setFocusedDay(focusedDay) {
        this.dashboardState.focusedDay = focusedDay;
    }
    // debug
    generateResources() {
        let resources = [
            '120',
            '129',
            'WIa',
            'WIb',
            'WII',
            'WIII',
            'WIV',
            'EI',
            'EII',
            'EIII',
            'EIV',
            'Lobby',
            'Library'
        ];
        return resources;
    }
};
ResourceViewerComponent = __decorate([
    Component({
        selector: 'em-resource-viewer',
        templateUrl: './app/dashboard/resource-viewer/resource-viewer.component.html',
        styleUrls: ['./app/dashboard/resource-viewer/resource-viewer.component.css']
    }), 
    __metadata('design:paramtypes', [DashboardStateService])
], ResourceViewerComponent);
//# sourceMappingURL=resource-viewer.component.js.map