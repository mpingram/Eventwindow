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
var fullcalendar_wrapper_service_1 = require('../../shared/fullcalendar-wrapper.service');
var event_service_1 = require('../../shared/event.service');
var ResourceCalendarComponent = (function () {
    function ResourceCalendarComponent(eventService, fullcalendar) {
        this.eventService = eventService;
        this.fullcalendar = fullcalendar;
    }
    Object.defineProperty(ResourceCalendarComponent.prototype, "events", {
        get: function () {
            return this._events;
        },
        enumerable: true,
        configurable: true
    });
    ResourceCalendarComponent.prototype.ngOnInit = function () {
        this.fullcalendar.initialize(this.calendarElement);
    };
    ResourceCalendarComponent.prototype.ngOnChanges = function () {
        this._events = this.eventService.getEventsByDay(this.date);
        this.fullcalendar.update();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ResourceCalendarComponent.prototype, "date", void 0);
    __decorate([
        core_1.ViewChild('calendar'), 
        __metadata('design:type', core_1.ElementRef)
    ], ResourceCalendarComponent.prototype, "calendarElement", void 0);
    ResourceCalendarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'em-resource-calendar',
            templateUrl: './resource-calendar.component.html',
            styleUrls: ['../../shared/styles/fullcalendar.css'],
            providers: [fullcalendar_wrapper_service_1.FullcalendarWrapperService]
        }), 
        __metadata('design:paramtypes', [event_service_1.EventService, fullcalendar_wrapper_service_1.FullcalendarWrapperService])
    ], ResourceCalendarComponent);
    return ResourceCalendarComponent;
}());
exports.ResourceCalendarComponent = ResourceCalendarComponent;
//# sourceMappingURL=resource-calendar.component.js.map