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
//import { EventList } 		from './event-list';
var backend_service_1 = require('./backend.service');
var logger_service_1 = require('./logger.service');
var EventService = (function () {
    // ============================================
    function EventService(backend, logger) {
        this.backend = backend;
        this.logger = logger;
        this._defaultBufferRange = 14;
        this._today = moment().startOf('day');
        this._eventBufferStartDate = this.today;
        this._eventBufferEndDate = this._eventBufferStartDate.clone().add(this._defaultBufferRange, 'days');
        this.loadEventBuffer(this._eventBufferStartDate, this._eventBufferEndDate);
        //this.getEventsByDay( this.today );
    }
    EventService.prototype.getEventsByDay = function (day) {
        var ISOStringKey = day.clone().startOf('day').toISOString();
        console.log(ISOStringKey);
        var daysEvents = this.eventBuffer.first(function (obs) { return obs.key === ISOStringKey; }).flatMap(function (obs) { return Observable_1.Observable.from(obs); });
        /* DEBUG */
        var displayArray = [];
        console.log(daysEvents.subscribe(function (event) { return console.log(event); }, function (error) { return console.error(error); }));
        return daysEvents;
    };
    Object.defineProperty(EventService.prototype, "today", {
        get: function () {
            return this._today.clone();
        },
        enumerable: true,
        configurable: true
    });
    // private methods
    // ---------------------------
    EventService.prototype.loadEventBuffer = function (start, end) {
        if (end === void 0) { end = start; }
        // configures eventBuffer with multiple streams ( Observers ), one for
        // each day. Each stream can be selected using parentObservable.flatMap()
        this.eventBuffer = this.backend.getEvents(start, end).groupBy(function (event) { return event.start.clone().startOf('day').toISOString(); });
    };
    /*
    private sortEventIntoBuffer( event:EmEvent ): void {

        // convert the event's start time to an ISO-formatted string representation
        let eventISODateString = event.start.clone().startOf('day').format();

        // if the property matching the ISO date string doesn't exist
        // in the eventBuffer, initialize the value as an empty array.
        // FIXME: no distinction between empty events in range and unloaded events out of range.
        if ( this._eventBuffer[ eventISODateString ] === undefined ) {
            this._eventBuffer[ eventISODateString ] = [];
        }

        // push that event onto the stack of events in that day.
        this._eventBuffer[ eventISODateString ].push(event);
    }
    */
    EventService.prototype.observableErrorHandler = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        this.logger.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    EventService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [backend_service_1.BackendService, logger_service_1.Logger])
    ], EventService);
    return EventService;
}());
exports.EventService = EventService;
//# sourceMappingURL=event.service.js.map