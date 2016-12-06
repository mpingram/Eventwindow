var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BackendService } from './backend.service';
import { Logger } from './logger.service';
export let EventService = class EventService {
    // ============================================
    constructor(backend, logger) {
        this.backend = backend;
        this.logger = logger;
        this._defaultBufferRange = 14;
        this._today = moment().startOf('day');
        this._eventBufferStartDate = this.today;
        this._eventBufferEndDate = this._eventBufferStartDate.clone().add(this._defaultBufferRange, 'days');
        this.loadEventBuffer(this._eventBufferStartDate, this._eventBufferEndDate);
    }
    getEventsByDay(day) {
        let ISOStringKey = day.clone().startOf('day').toISOString();
        let daysEvents = this.eventBuffer.find((obs) => obs.key === ISOStringKey).flatMap((obs) => {
            // if no result from find() method
            if (obs === undefined) {
                return Observable.from([]);
            }
            else {
                return Observable.from(obs.toArray());
            }
        });
        return daysEvents;
    }
    get today() {
        return this._today.clone();
    }
    // private methods
    // ---------------------------
    loadEventBuffer(start, end = start) {
        // split incoming data ( as Observable<EmEvent> ) into multiple streams, one for
        // each day. Each stream can be selected using parentObservable.flatMap()
        this.eventBuffer = this.backend.getEvents(start, end).groupBy((event) => event.start.clone().startOf('day').toISOString());
    }
    observableErrorHandler(error) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        this.logger.error(errMsg);
        return Observable.throw(errMsg);
    }
};
EventService = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [BackendService, Logger])
], EventService);
//# sourceMappingURL=event.service.js.map