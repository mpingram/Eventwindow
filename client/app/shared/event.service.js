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
        // TODO: understand
        this._eventBuffer = {};
        this._defaultBufferSize = 14;
        this._init();
    }
    EventService.prototype.getEventsByDay = function (day) {
        var dayISOString = day.clone().startOf('day').format();
        return this._eventBuffer[dayISOString];
    };
    EventService.prototype._init = function () {
        this._bufferStartDate = moment().startOf('day');
        // FIXME: hardcoded
        var start = moment().startOf('day');
        var end = start.clone().add(this._defaultBufferSize - 1, 'days');
        this._loadEventsIntoBuffer(start, end);
    };
    EventService.prototype._sortEventIntoBuffer = function (event) {
        var eventISODateString = event.start.clone().startOf('day').format();
        if (this._eventBuffer[eventISODateString] === undefined) {
            this._eventBuffer[eventISODateString] = [];
        }
        this._eventBuffer[eventISODateString].push(event);
    };
    EventService.prototype._observableErrorHandler = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        this.logger.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    EventService.prototype._getEvents = function (start, end) {
        return this.backend.getEvents(start, end);
    };
    EventService.prototype._loadEventsIntoBuffer = function (start, end) {
        var _this = this;
        this._getEvents(start, end)
            .subscribe(function (event) { return _this._sortEventIntoBuffer(event); }, function (error) { return _this._observableErrorHandler(error); });
    };
    EventService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [backend_service_1.BackendService, logger_service_1.Logger])
    ], EventService);
    return EventService;
}());
exports.EventService = EventService;
//# sourceMappingURL=event.service.js.map