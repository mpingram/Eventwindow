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
var event_service_1 = require('../../shared/event.service');
var ResourceCalendarComponent = (function () {
    function ResourceCalendarComponent(eventService) {
        this.eventService = eventService;
        // TODO: config object
        this._defaultTimeRange = [7, 19];
        this._numHoursInRange = this._defaultTimeRange[1] - this._defaultTimeRange[0];
    }
    Object.defineProperty(ResourceCalendarComponent.prototype, "events", {
        get: function () { return this._events; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceCalendarComponent.prototype, "resources", {
        get: function () {
            return this._resources;
        },
        set: function (resources) {
            this._resources = resources;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceCalendarComponent.prototype, "timeSlots", {
        get: function () {
            return this._timeSlots;
        },
        enumerable: true,
        configurable: true
    });
    ResourceCalendarComponent.prototype.ngOnInit = function () {
        this._timeSlots = this.initializeTimeSlots();
    };
    ResourceCalendarComponent.prototype.ngAfterViewInit = function () {
        var height = this.calculateTimeSlotHeight();
        this.timeSlotHeight = height.toString() + 'px';
        console.log(this.timeSlotHeight);
    };
    ResourceCalendarComponent.prototype.ngOnChanges = function () {
        this._events = this.eventService.getEventsByDay(this.date);
    };
    ResourceCalendarComponent.prototype.calculateTimeSlotHeight = function () {
        var columnHeight = this.timeAxisElement.nativeElement.offsetHeight;
        return columnHeight / this._numHoursInRange;
    };
    ResourceCalendarComponent.prototype.initializeTimeSlots = function () {
        var timeSlots = [];
        var firstTimeSlot = this.date.clone().startOf('day');
        var start = this._defaultTimeRange[0];
        var end = this._defaultTimeRange[1];
        for (var i = start; i < end; i++) {
            var timeSlot = firstTimeSlot.clone();
            timeSlot.add(i, 'hours');
            timeSlots.push(timeSlot);
        }
        return timeSlots;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], ResourceCalendarComponent.prototype, "resources", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ResourceCalendarComponent.prototype, "date", void 0);
    __decorate([
        core_1.ViewChild('timeAxis'), 
        __metadata('design:type', core_1.ElementRef)
    ], ResourceCalendarComponent.prototype, "timeAxisElement", void 0);
    ResourceCalendarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'em-resource-calendar',
            templateUrl: './resource-calendar.component.html',
            styleUrls: ['./resource-calendar.component.css'],
        }), 
        __metadata('design:paramtypes', [event_service_1.EventService])
    ], ResourceCalendarComponent);
    return ResourceCalendarComponent;
}());
exports.ResourceCalendarComponent = ResourceCalendarComponent;
//# sourceMappingURL=resource-calendar.component.js.map