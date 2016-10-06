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
var backend_service_1 = require('./backend.service');
var logger_service_1 = require('./logger.service');
var EventService = (function () {
    function EventService(backend, logger) {
        this.backend = backend;
        this.logger = logger;
        this.defaultBufferSize = 14;
        this.bufferSize = this.defaultBufferSize;
    }
    EventService.prototype.sortEventsByStart = function (eventArray) {
        return eventArray.sort(function (a, b) {
            if (a.start.isAfter(b.start))
                return 1;
            else if (a.start.isBefore(b.start))
                return -1;
            else
                return 0;
        });
    };
    // accepts sorted array of Events
    EventService.prototype.convertToBuffer = function (eventArray) {
        var buffer = [];
        var lastIndex = eventArray.length - 1;
        var firstDay = eventArray[0].start.clone();
        var lastDay = eventArray[lastIndex].start.clone();
        var currentDay = firstDay.clone();
        var event;
        var bufferDay = [];
        for (var i = 0; i <= lastIndex; i++) {
            event = eventArray[i];
            if (event.start.isSame(currentDay, 'day')) {
                bufferDay.push(event);
            }
            else {
                buffer.push(bufferDay);
                bufferDay = [];
                currentDay.add(1, 'day');
            }
        }
        return buffer;
    };
    EventService.prototype.loadEventBuffer = function (bufferStart, bufferEnd) {
        var _this = this;
        var bufferSize = bufferStart.diff(bufferEnd, 'days');
        this.backend.getEvents(bufferStart, bufferEnd).then(function (eventArray) {
            _this.logger.log("Fetched " + eventArray.length + " events.");
            _this.sortEventsByStart(eventArray);
            _this.eventBuffer = _this.convertToBuffer(eventArray);
            //DEBUG
            //this.logger.log(this.eventBuffer);
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