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
var Observable_1 = require('rxjs/Observable');
var event_service_1 = require('../../shared/event.service');
var ResourceSchedulerComponent = (function () {
    // --------------------------
    function ResourceSchedulerComponent(eventService) {
        this.eventService = eventService;
        this.currentDayIsToday = moment().isSame(this.date, 'day');
        this._viewInitialized = false;
        // TODO: config object to configure default time range
        this._defaultTimeRange = [7, 20];
        this._timeRange = this._defaultTimeRange;
        this._numHoursInRange = this._timeRange[1] - this._timeRange[0];
    }
    Object.defineProperty(ResourceSchedulerComponent.prototype, "timeSlotHeight", {
        // allows lazy evaluation
        get: function () {
            if (this._hourInPx !== undefined) {
                return this._hourInPx + 'px';
            }
            else {
                return '40px';
            }
        },
        enumerable: true,
        configurable: true
    });
    ResourceSchedulerComponent.prototype.ngOnInit = function () {
        this.timeSlotList = this.initializeTimeSlotList();
        this.firstTimeSlotStart = this.timeSlotList[0];
        this.eventList = this.eventService.getEventsByDay(this.date);
        this._eventsGroupedByResource = this.groupEventsByResource();
    };
    ResourceSchedulerComponent.prototype.ngAfterViewInit = function () {
        this._viewInitialized = true;
        this._hourInPx = this.measureHourInPixels();
    };
    ResourceSchedulerComponent.prototype.ngOnChanges = function () {
        this.eventList = this.eventService.getEventsByDay(this.date);
        this._eventsGroupedByResource = this.groupEventsByResource();
    };
    // public methods
    // ----------------------------------------
    ResourceSchedulerComponent.prototype.getEventsByResource = function (resourceName) {
        return this._eventsGroupedByResource.find(function (eventGroup) { return eventGroup.key === resourceName; }).flatMap(function (eventGroup) {
            if (eventGroup === undefined) {
                return Observable_1.Observable.from([]);
            }
            else {
                return Observable_1.Observable.from(eventGroup.toArray());
            }
        });
    };
    ResourceSchedulerComponent.prototype.calculateEventPixelsFromTop = function (event) {
        if (this._viewInitialized && event !== undefined) {
            var pixelsFromTop = void 0;
            var eventStartTime = this.minutesFromMidnight(event.start);
            var minutesFromStart = eventStartTime - this.firstTimeSlotStart;
            var hoursFromStart = minutesFromStart / 60;
            pixelsFromTop = hoursFromStart * this._hourInPx;
            return pixelsFromTop + 'px';
        }
        else {
            return 0 + 'px';
        }
    };
    ResourceSchedulerComponent.prototype.calculateEventHeight = function (event) {
        if (this._viewInitialized && event !== undefined) {
            var eventLengthInMinutes = event.end.diff(event.start, 'minutes');
            var eventLengthInHours = eventLengthInMinutes / 60;
            var eventLengthInPx = eventLengthInHours * this._hourInPx;
            return eventLengthInPx + 'px';
        }
        else {
            return 0 + 'px';
        }
    };
    ResourceSchedulerComponent.prototype.displayClockTimeFromTimeSlot = function (timeSlotMinutes) {
        var time = moment().startOf('day');
        time.add(timeSlotMinutes, 'minutes');
        return time.format('h:mm');
    };
    // private methods
    // --------------------------------------
    // 
    ResourceSchedulerComponent.prototype.groupEventsByResource = function () {
        return this.eventList.flatMap(function (eventArr) { return Observable_1.Observable.from(eventArr); }).groupBy(function (event) { return event.primaryResource; });
    };
    ResourceSchedulerComponent.prototype.measureHourInPixels = function () {
        var columnHeight = this.timeAxisElement.nativeElement.offsetHeight;
        return columnHeight / this._numHoursInRange;
    };
    ResourceSchedulerComponent.prototype.minutesFromMidnight = function (time) {
        var midnight = time.clone().startOf('day');
        return time.diff(midnight, 'minutes');
    };
    ResourceSchedulerComponent.prototype.initializeTimeSlotList = function () {
        var timeSlotList = [];
        var firstTimeSlotMoment = this.date.clone().startOf('day');
        var start = this._timeRange[0];
        var end = this._timeRange[1];
        for (var i = start; i < end; i++) {
            var timeSlot = firstTimeSlotMoment.clone();
            timeSlot.add(i, 'hours');
            timeSlotList.push(this.minutesFromMidnight(timeSlot));
        }
        return timeSlotList;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ResourceSchedulerComponent.prototype, "resources", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ResourceSchedulerComponent.prototype, "date", void 0);
    __decorate([
        core_1.ViewChild('timeAxis'), 
        __metadata('design:type', core_1.ElementRef)
    ], ResourceSchedulerComponent.prototype, "timeAxisElement", void 0);
    ResourceSchedulerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'em-resource-scheduler',
            templateUrl: './resource-scheduler.component.html',
            styleUrls: ['./resource-scheduler.component.css'],
        }), 
        __metadata('design:paramtypes', [event_service_1.EventService])
    ], ResourceSchedulerComponent);
    return ResourceSchedulerComponent;
}());
exports.ResourceSchedulerComponent = ResourceSchedulerComponent;
//# sourceMappingURL=resource-scheduler.component.js.map