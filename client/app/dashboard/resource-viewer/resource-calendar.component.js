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
    // --------------------------
    function ResourceCalendarComponent(eventService) {
        this.eventService = eventService;
        // TODO: config object
        this._defaultTimeRange = [7, 20];
        this._timeRange = this._defaultTimeRange;
        this._numHoursInRange = this._timeRange[1] - this._timeRange[0];
    }
    Object.defineProperty(ResourceCalendarComponent.prototype, "timeSlotList", {
        get: function () {
            return this._timeSlotList.slice(this._timeRange[0], this._timeRange[1]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceCalendarComponent.prototype, "timeSlotHeight", {
        get: function () {
            if (this._timeSlotHeight !== undefined) {
                return this._timeSlotHeight.toString() + 'px';
            }
        },
        enumerable: true,
        configurable: true
    });
    ResourceCalendarComponent.prototype.ngOnInit = function () {
        this.initialize();
    };
    ResourceCalendarComponent.prototype.ngAfterViewInit = function () {
        this._hourInPx = this.measureHourInPixels();
        this._timeSlotHeight = this._hourInPx;
    };
    ResourceCalendarComponent.prototype.ngOnChanges = function () {
        this.events = this.eventService.getEventsByDay(this.date);
    };
    // private methods
    // --------------------------------------
    ResourceCalendarComponent.prototype.initialize = function () {
        this._timeSlotList = this.initializeTimeSlotList();
    };
    ResourceCalendarComponent.prototype.measureHourInPixels = function () {
        var columnHeight = this.timeAxisElement.nativeElement.offsetHeight;
        return columnHeight / this._numHoursInRange;
    };
    ResourceCalendarComponent.prototype.initializeTimeSlotList = function () {
        var timeSlotLookup = [];
        var firstTimeSlot = this.date.clone().startOf('day');
        var start = this._timeRange[0];
        var end = this._timeRange[1];
        for (var i = start; i < end; i++) {
            var timeSlot = firstTimeSlot.clone();
            timeSlot.add(i, 'hours');
            timeSlotLookup[i] = timeSlot;
        }
        return timeSlotLookup;
    };
    ResourceCalendarComponent.prototype.displayEvent = function (event) {
        // match event to resource column
        // calculate dimensions
        var pxFromTop = this.calculateEventPixelsFromTop(event);
        var height = this.calculateEventHeight(event);
        // create DOM element or draw SVG element, with hooks for 
        // executing functions on click
    };
    ResourceCalendarComponent.prototype.calculateEventPixelsFromTop = function (event) {
        var pixelsFromTop;
        // FIXME: this is awful
        // Make sure it's tied to 'top', or else it'll break when given negative numbers,
        // ie if event occurs before range displays
        var timeFromStartOfRange = event.start.diff(this.timeSlotList[0], 'minutes');
        timeFromStartOfRange *= 60;
        pixelsFromTop = timeFromStartOfRange * this._hourInPx;
        return pixelsFromTop;
    };
    ResourceCalendarComponent.prototype.calculateEventHeight = function (event) {
        var eventLengthInMinutes = event.end.diff(event.start, 'minutes');
        var eventLengthInHours = eventLengthInMinutes * 60;
        return eventLengthInHours * this._hourInPx;
    };
    ResourceCalendarComponent.prototype.updateEvents = function (events) {
        var len = events.length;
        for (var i = 0; i < len; i++) {
            this.displayEvent(events[i]);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ResourceCalendarComponent.prototype, "resources", void 0);
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