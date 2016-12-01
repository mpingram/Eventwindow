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
var ResourceViewerComponent = (function () {
    function ResourceViewerComponent(dashboardState) {
        this.dashboardState = dashboardState;
        this.resources = this.generateResources();
        // private properties
        // ------------------------------------------
        this._today = moment().startOf('day');
        this._date = this.dashboardState.focusedDay.clone();
    }
    Object.defineProperty(ResourceViewerComponent.prototype, "currentDayIsToday", {
        // public properties
        // --------------------------------------
        get: function () {
            return this._today.isSame(this._date, 'day');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceViewerComponent.prototype, "date", {
        get: function () {
            return this.dashboardState.focusedDay.clone();
        },
        enumerable: true,
        configurable: true
    });
    // public methods
    // --------------------------------------
    ResourceViewerComponent.prototype.nextDay = function () {
        this._date.add(1, 'day');
        this.setFocusedDay(this._date);
    };
    ResourceViewerComponent.prototype.prevDay = function () {
        this._date.subtract(1, 'day');
        this.setFocusedDay(this._date);
    };
    ResourceViewerComponent.prototype.goToDate = function (targetDate) {
        this._date = targetDate.clone();
        this.setFocusedDay(this._date);
    };
    ResourceViewerComponent.prototype.goToToday = function () {
        if (!this.currentDayIsToday) {
            this._date = this._today.clone();
            this.setFocusedDay(this._date);
        }
    };
    ;
    // private methods
    // ------------------------------------------
    ResourceViewerComponent.prototype.setFocusedDay = function (focusedDay) {
        this.dashboardState.focusedDay = focusedDay;
    };
    // debug
    ResourceViewerComponent.prototype.generateResources = function () {
        var resources = [
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
    };
    ResourceViewerComponent = __decorate([
        core_1.Component({
            selector: 'em-resource-viewer',
            templateUrl: './app/dashboard/resource-viewer/resource-viewer.component.html',
            styleUrls: ['./app/dashboard/resource-viewer/resource-viewer.component.css']
        }), 
        __metadata('design:paramtypes', [dashboard_state_service_1.DashboardStateService])
    ], ResourceViewerComponent);
    return ResourceViewerComponent;
}());
exports.ResourceViewerComponent = ResourceViewerComponent;
//# sourceMappingURL=resource-viewer.component.js.map