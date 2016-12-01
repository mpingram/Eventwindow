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
var DashboardStateService = (function () {
    // ------------------------------------------
    function DashboardStateService() {
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
    Object.defineProperty(DashboardStateService.prototype, "focusedEvent", {
        // get and set event focus
        // -------------------------------------
        get: function () { return this._focusedEvent; },
        set: function (eventId) {
            // toggle focus event
            if (this._focusedEvent !== eventId) {
                this._focusedEvent = eventId;
            }
            else {
                this._focusedEvent = '';
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(DashboardStateService.prototype, "highlightedEvent", {
        get: function () { return this._highlightedEvent; },
        set: function (eventId) {
            if (this._focusedEvent !== eventId) {
                this._highlightedEvent = eventId;
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(DashboardStateService.prototype, "focusedDay", {
        get: function () { return this._focusedDay; },
        set: function (day) {
            this._focusedDay = day;
        },
        enumerable: true,
        configurable: true
    });
    ;
    //--------------------------------------
    // event color map
    // -----------------------------------------
    DashboardStateService.prototype.getColorOf = function (eventType) {
        return this._eventTypeColorMap[eventType];
    };
    DashboardStateService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DashboardStateService);
    return DashboardStateService;
}());
exports.DashboardStateService = DashboardStateService;
//# sourceMappingURL=dashboard-state.service.js.map