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
var event_1 = require('./event');
var backend_service_1 = require('./backend.service');
var logger_service_1 = require('./logger.service');
var EventService = (function () {
    function EventService(backend, logger) {
        this.backend = backend;
        this.logger = logger;
        this.defaultBufferSize = 14;
    }
    EventService.prototype.sortEventsByStart = function (events) {
        return events.sort(function (a, b) {
            if (a.start.isAfter(b.start))
                return 1;
            else if (a.start.isBefore(b.start))
                return -1;
            else
                return 0;
        });
    };
    EventService.prototype.convertToBuffer = function (events, bufferSize) {
        var buffer = [];
        // initialize buffer with empty arrays
        for (var i = 0; i < bufferSize; i++) {
            buffer[i] = [];
        }
        var numEvents = events.length;
        var bufferIndex = 0;
        var currentDay = events[0].start.clone().startOf('day');
        for (var i = 0; i < numEvents; i++) {
            var thisDay = events[i].start.clone().startOf('day');
            while (thisDay.isAfter(currentDay)) {
                currentDay.add(1, 'day');
                bufferIndex++;
            }
            buffer[bufferIndex].push(events[i]);
        }
        return buffer;
    };
    EventService.prototype.getEvents = function (bufferSize) {
        var _this = this;
        if (bufferSize === undefined) {
            bufferSize = this.defaultBufferSize;
        }
        this.backend.getAll(event_1.Event, bufferSize).then(function (events) {
            _this.logger.log("Fetched " + events.length + " events.");
            _this.sortEventsByStart(events);
            _this.logger.log(events);
            _this.eventBuffer = _this.convertToBuffer(events, bufferSize);
            _this.logger.log(_this.eventBuffer);
        });
        return this.eventBuffer;
    };
    EventService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [backend_service_1.BackendService, logger_service_1.Logger])
    ], EventService);
    return EventService;
}());
exports.EventService = EventService;
//# sourceMappingURL=event.service.js.map