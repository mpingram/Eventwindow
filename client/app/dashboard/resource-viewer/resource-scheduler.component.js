var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EventService } from '../../shared/event.service';
import { DashboardStateService } from '../shared-dashboard/dashboard-state.service';
export let ResourceSchedulerComponent = class ResourceSchedulerComponent {
    // ==============================================================
    constructor(eventService, dashboardState) {
        this.eventService = eventService;
        this.dashboardState = dashboardState;
        this.currentDayIsToday = moment().isSame(this.date, 'day');
        this._viewInitialized = false;
        // TODO: config object to configure default time range
        this._defaultTimeRange = [7, 20];
        this._timeRange = this._defaultTimeRange;
        this._numHoursInRange = this._timeRange[1] - this._timeRange[0];
    }
    // allows lazy evaluation
    get timeSlotHeight() {
        if (this._hourInPx !== undefined) {
            return this._hourInPx + 'px';
        }
        else {
            return '40px';
        }
    }
    // public methods
    // ----------------------------------------
    isFocusedEvent(event) {
        ;
        return this.dashboardState.focusedEvent === event.id;
    }
    toggleFocusedEvent(event) {
        if (this.isFocusedEvent(event) === false) {
            this.dashboardState.focusedEvent = event.id;
        }
        else {
            this.dashboardState.focusedEvent = undefined;
        }
    }
    getEventsByResource(resourceName) {
        return this._eventsGroupedByResource.find((eventGroup) => eventGroup.key === resourceName).flatMap((eventGroup) => {
            if (eventGroup === undefined) {
                return Observable.from([]);
            }
            else {
                return Observable.from(eventGroup.toArray());
            }
        });
    }
    calculateEventPixelsFromTop(event) {
        if (this._viewInitialized && event !== undefined) {
            let pixelsFromTop;
            const eventStartTime = this.minutesFromMidnight(event.start);
            const minutesFromStart = eventStartTime - this.firstTimeSlotStart;
            const hoursFromStart = minutesFromStart / 60;
            pixelsFromTop = hoursFromStart * this._hourInPx;
            return pixelsFromTop + 'px';
        }
        else {
            return 0 + 'px';
        }
    }
    calculateEventHeight(event) {
        if (this._viewInitialized && event !== undefined) {
            const eventLengthInMinutes = event.end.diff(event.start, 'minutes');
            const eventLengthInHours = eventLengthInMinutes / 60;
            const eventLengthInPx = eventLengthInHours * this._hourInPx;
            return eventLengthInPx + 'px';
        }
        else {
            return 0 + 'px';
        }
    }
    displayClockTimeFromTimeSlot(timeSlotMinutes) {
        let time = moment().startOf('day');
        time.add(timeSlotMinutes, 'minutes');
        return time.format('h:mm');
    }
    ngOnInit() {
        this.timeSlotList = this.initializeTimeSlotList();
        this.firstTimeSlotStart = this.timeSlotList[0];
        this.eventList = this.eventService.getEventsByDay(this.date);
        this._eventsGroupedByResource = this.groupEventsByResource();
    }
    ngAfterViewInit() {
        this._viewInitialized = true;
        this._hourInPx = this.measureHourInPixels();
    }
    ngOnChanges() {
        this.eventList = this.eventService.getEventsByDay(this.date);
        this._eventsGroupedByResource = this.groupEventsByResource();
    }
    // --------------------------
    // private methods
    // --------------------------------------
    // 
    groupEventsByResource() {
        return this.eventList.flatMap((eventArr) => Observable.from(eventArr)).groupBy((event) => event.primaryResource);
    }
    measureHourInPixels() {
        const columnHeight = this.timeAxisElement.nativeElement.offsetHeight;
        return columnHeight / this._numHoursInRange;
    }
    minutesFromMidnight(time) {
        let midnight = time.clone().startOf('day');
        return time.diff(midnight, 'minutes');
    }
    initializeTimeSlotList() {
        let timeSlotList = [];
        const firstTimeSlotMoment = this.date.clone().startOf('day');
        const start = this._timeRange[0];
        const end = this._timeRange[1];
        for (let i = start; i < end; i++) {
            let timeSlot = firstTimeSlotMoment.clone();
            timeSlot.add(i, 'hours');
            timeSlotList.push(this.minutesFromMidnight(timeSlot));
        }
        return timeSlotList;
    }
};
__decorate([
    Input(), 
    __metadata('design:type', Array)
], ResourceSchedulerComponent.prototype, "resources", void 0);
__decorate([
    Input(), 
    __metadata('design:type', Object)
], ResourceSchedulerComponent.prototype, "date", void 0);
__decorate([
    ViewChild('timeAxis'), 
    __metadata('design:type', ElementRef)
], ResourceSchedulerComponent.prototype, "timeAxisElement", void 0);
ResourceSchedulerComponent = __decorate([
    Component({
        selector: 'em-resource-scheduler',
        templateUrl: './app/dashboard/resource-viewer/resource-scheduler.component.html',
        styleUrls: ['./app/dashboard/resource-viewer/resource-scheduler.component.css'],
    }), 
    __metadata('design:paramtypes', [EventService, DashboardStateService])
], ResourceSchedulerComponent);
//# sourceMappingURL=resource-scheduler.component.js.map