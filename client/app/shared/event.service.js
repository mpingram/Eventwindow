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
var backend_service_1 = require('./backend.service');
var logger_service_1 = require('./logger.service');
var EventService = (function () {
    function EventService(backend, logger) {
        this.backend = backend;
        this.logger = logger;
        this.eventBuffer = [[]];
        this._defaultBufferSize = 14;
        this._init();
    }
    /*
    public get eventBuffer() : EventBuffer {
        //this._eventBuffer;
    } */
    EventService.prototype._init = function () {
        var _this = this;
        // FIXME: hardcoded
        var start = moment();
        var end = start.clone().add(this._defaultBufferSize, 'days');
        // FXIME: still not grokking it
        this._asyncLoadEventBuffer(start, end)
            .subscribe(function (events) {
            _this.eventBuffer = (events);
        });
    };
    /*
    private _sortEventsByStart(eventArray: Event[]): Event[] {
        return eventArray.sort( (a,b) => {
            if (a.start.isAfter(b.start)) return 1;
            else if (a.start.isBefore(b.start)) return -1;
            else return 0;
        });
    }
    */
    // accepts sorted array of Events
    EventService.prototype._convertToBuffer = function (eventArray) {
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
                bufferDay.push(event);
                currentDay.add(1, 'day');
            }
            if (i === lastIndex) {
                buffer.push(bufferDay);
            }
        }
        return buffer;
    };
    EventService.prototype._errorHandler = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        this.logger.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    EventService.prototype._asyncLoadEventBuffer = function (bufferStart, bufferEnd) {
        return this.backend.getEvents(bufferStart, bufferEnd)
            .map(this._convertToBuffer);
    };
    EventService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [backend_service_1.BackendService, logger_service_1.Logger])
    ], EventService);
    return EventService;
}());
exports.EventService = EventService;
//# sourceMappingURL=event.service.js.map