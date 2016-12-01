var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, trigger, state, style, transition, animate } from '@angular/core';
import { EventService } from '../../../shared/event.service';
import { DashboardStateService } from '../../shared-dashboard/dashboard-state.service';
export let EventListDayComponent = class EventListDayComponent {
    constructor(eventService, dashboardState) {
        this.eventService = eventService;
        this.dashboardState = dashboardState;
        this.eventListOpen = true;
    }
    isFocusedEvent(event) {
        return this.dashboardState.focusedEvent === event.id;
    }
    setActiveDay(day) {
        this.dashboardState.focusedDay = day;
    }
    dayHeaderClickHandler() {
        // open event list if closed
        if (this.eventListOpen === false) {
            this.eventListOpen = true;
        }
        // set active day
        this.setActiveDay(this.day);
    }
    toggleDropdownState(domEvent) {
        if (domEvent !== undefined) {
            // prevent event from triggering setTodayAsActiveDay
            domEvent.stopPropagation();
        }
        this.eventListOpen = !this.eventListOpen;
    }
    animationStateFrom(bool) {
        return bool ? 'open' : 'closed';
    }
    toggleFocusedEvent(event) {
        if (this.dashboardState.focusedEvent === event.id) {
            this.unsetFocusedEvent();
        }
        else {
            this.setActiveDay(event.start);
            this.setFocusedEventTo(event);
        }
    }
    ngOnInit() {
        this.eventList = this.eventService.getEventsByDay(this.day);
        this.eventListIsEmpty = this.eventList.isEmpty();
    }
    setFocusedEventTo(emEvent) {
        this.dashboardState.focusedEvent = emEvent.id;
    }
    unsetFocusedEvent() {
        this.dashboardState.focusedEvent = '';
    }
};
__decorate([
    Input(), 
    __metadata('design:type', Object)
], EventListDayComponent.prototype, "day", void 0);
EventListDayComponent = __decorate([
    Component({
        selector: 'em-event-list-day',
        templateUrl: './app/dashboard/event-viewer/event-list/event-list-day.component.html',
        styleUrls: ['./app/dashboard/event-viewer/event-list/event-list-day.component.css'],
        animations: [
            trigger('openClosed', [
                state('open', style({ height: '*' })),
                state('closed', style({ height: 0 })),
                transition('open => closed', animate('350ms ease-in-out')),
                transition('closed => open', animate('400ms ease-in-out')),
            ])
        ],
    }), 
    __metadata('design:paramtypes', [EventService, DashboardStateService])
], EventListDayComponent);
//# sourceMappingURL=event-list-day.component.js.map