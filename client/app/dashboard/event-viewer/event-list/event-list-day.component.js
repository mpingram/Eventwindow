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
var event_service_1 = require('../../../shared/event.service');
var dashboard_state_service_1 = require('../../shared-dashboard/dashboard-state.service');
var EventListDayComponent = (function () {
    function EventListDayComponent(eventService, dashboardState) {
        this.eventService = eventService;
        this.dashboardState = dashboardState;
        this.eventListOpen = true;
    }
    EventListDayComponent.prototype.isFocusedEvent = function (event) {
        return this.dashboardState.focusedEvent === event.id;
    };
    EventListDayComponent.prototype.setActiveDay = function (day) {
        this.dashboardState.focusedDay = day;
    };
    EventListDayComponent.prototype.dayHeaderClickHandler = function () {
        // open event list if closed
        if (this.eventListOpen === false) {
            this.eventListOpen = true;
        }
        // set active day
        this.setActiveDay(this.day);
    };
    EventListDayComponent.prototype.toggleDropdownState = function (domEvent) {
        if (domEvent !== undefined) {
            // prevent event from triggering setTodayAsActiveDay
            domEvent.stopPropagation();
        }
        this.eventListOpen = !this.eventListOpen;
    };
    EventListDayComponent.prototype.animationStateFrom = function (bool) {
        return bool ? 'open' : 'closed';
    };
    EventListDayComponent.prototype.toggleFocusedEvent = function (event) {
        if (this.dashboardState.focusedEvent === event.id) {
            this.unsetFocusedEvent();
        }
        else {
            this.setActiveDay(event.start);
            this.setFocusedEventTo(event);
        }
    };
    EventListDayComponent.prototype.ngOnInit = function () {
        this.eventList = this.eventService.getEventsByDay(this.day);
        this.eventListIsEmpty = this.eventList.isEmpty();
    };
    EventListDayComponent.prototype.setFocusedEventTo = function (emEvent) {
        this.dashboardState.focusedEvent = emEvent.id;
    };
    EventListDayComponent.prototype.unsetFocusedEvent = function () {
        this.dashboardState.focusedEvent = '';
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], EventListDayComponent.prototype, "day", void 0);
    EventListDayComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'em-event-list-day',
            templateUrl: 'event-list-day.component.html',
            styleUrls: ['event-list-day.component.css'],
            animations: [
                core_1.trigger('openClosed', [
                    core_1.state('open', core_1.style({ height: '*' })),
                    core_1.state('closed', core_1.style({ height: 0 })),
                    core_1.transition('open => closed', core_1.animate('350ms ease-in-out')),
                    core_1.transition('closed => open', core_1.animate('400ms ease-in-out')),
                ])
            ],
        }), 
        __metadata('design:paramtypes', [event_service_1.EventService, dashboard_state_service_1.DashboardStateService])
    ], EventListDayComponent);
    return EventListDayComponent;
}());
exports.EventListDayComponent = EventListDayComponent;
//# sourceMappingURL=event-list-day.component.js.map