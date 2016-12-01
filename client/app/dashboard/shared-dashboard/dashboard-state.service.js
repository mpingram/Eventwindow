var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
export let DashboardStateService = class DashboardStateService {
    // ------------------------------------------
    constructor() {
        this._focusedEvent = '';
        this._highlightedEvent = '';
        this._today = moment().startOf('day');
        this._eventTypeColorMap = {
            'Class': '#2E86AB',
            'Meeting': '#4B3F72',
            'Internal Event': '#FFC857',
            'External Event': '#FF1500'
        };
        this.focusedDay = this._today.clone();
    }
    // get and set event focus
    // -------------------------------------
    get focusedEvent() { return this._focusedEvent; }
    ;
    get highlightedEvent() { return this._highlightedEvent; }
    ;
    get focusedDay() { return this._focusedDay; }
    ;
    set focusedEvent(eventId) {
        // toggle focus event
        if (this._focusedEvent !== eventId) {
            this._focusedEvent = eventId;
        }
        else {
            this._focusedEvent = '';
        }
    }
    set focusedDay(day) {
        this._focusedDay = day;
    }
    set highlightedEvent(eventId) {
        if (this._focusedEvent !== eventId) {
            this._highlightedEvent = eventId;
        }
    }
    //--------------------------------------
    // event color map
    // -----------------------------------------
    getColorOf(eventType) {
        return this._eventTypeColorMap[eventType];
    }
};
DashboardStateService = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [])
], DashboardStateService);
//# sourceMappingURL=dashboard-state.service.js.map