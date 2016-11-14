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
var ResourceSchedulerComponent = (function () {
    // --------------------------
    function ResourceSchedulerComponent(eventService) {
        this.eventService = eventService;
        this.now = moment();
        this.currentDayIsToday = this.now.isSame(this.date, 'day');
        // TODO: config object
        this._defaultTimeRange = [7, 20];
        this._timeRange = this._defaultTimeRange;
        this._numHoursInRange = this._timeRange[1] - this._timeRange[0];
        this._filteredEvents = {};
    }
    Object.defineProperty(ResourceSchedulerComponent.prototype, "timeSlotList", {
        get: function () {
            return this._timeSlotList;
            //return this._timeSlotList.slice( this._timeRange[0], this._timeRange[1] );
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceSchedulerComponent.prototype, "timeSlotHeight", {
        get: function () {
            if (this._timeSlotHeight !== undefined) {
                return this._timeSlotHeight.toString() + 'px';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceSchedulerComponent.prototype, "firstTimeSlot", {
        get: function () {
            return this._timeSlotList[0];
        },
        enumerable: true,
        configurable: true
    });
    ResourceSchedulerComponent.prototype.ngOnInit = function () {
        this._timeSlotList = this.initializeTimeSlotList();
        this._filteredEvents = this.filterEventsByResource();
        console.log(this._filteredEvents);
    };
    ResourceSchedulerComponent.prototype.ngAfterViewInit = function () {
        this._hourInPx = this.measureHourInPixels();
        this._timeSlotHeight = this._hourInPx;
    };
    ResourceSchedulerComponent.prototype.ngOnChanges = function () {
        this.events = this.eventService.getEventsByDay(this.date);
        this._filteredEvents = this.filterEventsByResource();
    };
    // public methods
    // ----------------------------------------
    ResourceSchedulerComponent.prototype.getFilteredEvents = function (resourceName) {
        if (this._filteredEvents[resourceName] !== undefined) {
            return this._filteredEvents[resourceName];
        }
        else {
            return [];
        }
    };
    ResourceSchedulerComponent.prototype.calculateEventPixelsFromTop = function (event) {
        var pixelsFromTop;
        // FIXME: this is awful
        // Make sure it's tied to 'top', or else it'll break when given negative numbers,
        // ie if event occurs before range displays
        var timeFromStartOfRange = event.start.diff(this.firstTimeSlot, 'minutes');
        timeFromStartOfRange *= 60;
        pixelsFromTop = timeFromStartOfRange * this._hourInPx;
        console.log(event.name + ' pixels from top: ' + pixelsFromTop);
        return pixelsFromTop;
    };
    ResourceSchedulerComponent.prototype.calculateEventHeight = function (event) {
        var eventLengthInMinutes = event.end.diff(event.start, 'minutes');
        var eventLengthInHours = eventLengthInMinutes * 60;
        return eventLengthInHours * this._hourInPx;
    };
    // private methods
    // --------------------------------------
    // 
    ResourceSchedulerComponent.prototype.filterEventsByResource = function () {
        var filteredEvents = {};
        for (var i = 0; i < this.events.length; i++) {
            // COLOSSAL FIXME: ONLY WORKS WITH PRIMARY RESOURCE
            var eventResource = this.events[i].primaryResource;
            if (filteredEvents[eventResource] === undefined) {
                filteredEvents[eventResource] = [];
            }
            filteredEvents[eventResource].push(this.events[i]);
        }
        return filteredEvents;
    };
    ResourceSchedulerComponent.prototype.measureHourInPixels = function () {
        var columnHeight = this.timeAxisElement.nativeElement.offsetHeight;
        return columnHeight / this._numHoursInRange;
    };
    ResourceSchedulerComponent.prototype.initializeTimeSlotList = function () {
        var timeSlotList = [];
        var firstTimeSlot = this.date.clone().startOf('day');
        var start = this._timeRange[0];
        var end = this._timeRange[1];
        for (var i = start; i < end; i++) {
            var timeSlot = firstTimeSlot.clone();
            timeSlot.add(i, 'hours');
            timeSlotList.push(timeSlot);
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