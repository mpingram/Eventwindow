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
var EventListDayComponent = (function () {
    function EventListDayComponent(eventService) {
        this.eventService = eventService;
        this.eventListOpen = true;
    }
    EventListDayComponent.prototype.isFocusedEvent = function (event) {
        return this.dashboardState.focusedEvent === event.id;
    };
    EventListDayComponent.prototype.setTodayAsActiveDay = function ($event) {
        if (!this.eventListOpen) {
            this.eventListOpen = true;
        }
    };
    EventListDayComponent.prototype.toggleDropdownState = function ($event) {
        // prevent event from triggering setTodayAsActiveDay
        $event.stopPropagation();
        this.eventListOpen = !this.eventListOpen;
    };
    EventListDayComponent.prototype.animationStateFrom = function (bool) {
        return bool ? 'open' : 'closed';
    };
    EventListDayComponent.prototype.setFocusedEventTo = function (emEvent) {
        // FIXME: think re best way to implement this.
        // can use @Output to send a dom event out. Does state become an issue, then?
        // Yeah, it totally does. How does an event-list-item know it's not the
        // focused event any more?
        // Service that manages all this bs / focuses events across different components?
        // Bc it's quite a bridge between the Event-list and the resource-viewer. A lot easier
        // to have events keep an eye on a shared focusedEvent variable that may match their id -
        // also an easy way to implement repeated/grouped events highlighting. That may not even
        // need a service.... OK, share state through object it is. Nvm about the service.
        // NVM you already learned that passing a fucking state variable down the component tree
        // is brittle and dumb. Use a damn service ugh
        this.dashboardState.focusedEvent = emEvent.id;
    };
    EventListDayComponent.prototype.ngOnInit = function () {
        this.eventList = this.eventService.getEventsByDay(this.day);
        this.eventListIsEmpty = this.eventList.isEmpty();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], EventListDayComponent.prototype, "day", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], EventListDayComponent.prototype, "dashboardState", void 0);
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
        __metadata('design:paramtypes', [event_service_1.EventService])
    ], EventListDayComponent);
    return EventListDayComponent;
}());
exports.EventListDayComponent = EventListDayComponent;
//# sourceMappingURL=event-list-day.component.js.map