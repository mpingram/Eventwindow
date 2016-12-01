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
import { Logger } from './logger.service';
// FIXME: mock
export let BackendService = class BackendService {
    constructor(logger) {
        this.logger = logger;
        // event generator
        // ------------------------
        this.eventTitlePool = ['Rap', 'Classical Music', 'Sting and the Police', 'Baby', 'Pillow', 'Chromolithograph', 'Men', 'Bath', 'German', 'Grasshopper', 'Peer-to-Peer', 'Forestry', 'Paramedic', 'Hot Doctor', 'Jellyfish', 'Angry Bears', 'Intersectionality', 'Shirt', 'Astronaut', 'Duck', 'Fashion', 'Gentrification', 'Yoga', 'Dance', 'Balloon'];
        this.eventSubtitlePool = ['Party', 'Burlesque', 'Conference', 'Discussion', 'Lecture', 'Meeting', 'Round Table', 'Viewing', 'Competition', 'Battle', 'and the Sorcerer\'s Stone', 'Class', 'Intervention', 'Brunch', 'Coast to Coast', 'Meditation', 'Fight', 'Teleconference', 'Marathon'];
        this.firstNamePool = ['Richard', 'Flingus', 'Sid', 'Ebenezer', 'Rocky', 'Dontae', 'Margarette', 'Robin', 'Willow', 'Ola', 'Bonnie', 'Nicole', 'Diana', 'Dianna', 'Diananana', 'Michael', 'Jareth'];
        this.lastNamePool = ['Nye', 'Hatfield', 'Herring', 'Lee', 'Li', 'Heaton', 'Cohen', 'Tomlinson', 'Brenner', 'Butler', 'King', 'Morris', 'Bungleton', 'Powerhat', 'Dolphin', 'the Goblin King', 'Goethe', 'Yang', 'Brown', 'Foghorn', 'Colton', 'Dongus'];
        this.resourcesPool = ['EI', 'EII', 'EIII', 'EIV', 'WIa', 'WIb', 'WII', 'WIII', 'WIV', 'Lobby', 'Library', '120', '129'];
        this.eventTypePool = ['Class', 'Meeting', 'Internal Event', 'External Event'];
        this.abbreviationMap = {
            'Class': 'C',
            'Meeting': 'M',
            'Internal Event': 'IE',
            'External Event': 'EE'
        };
    }
    getEvents(rangeStart, rangeEnd) {
        let eventObservable;
        if (rangeStart.isAfter(rangeEnd)) {
            const errorMessage = 'Incorrect Moment arguments @ backendService.getEvents';
            eventObservable = Observable.throw(errorMessage);
        }
        else {
            let eventArray = this.generateEventArray(rangeStart, rangeEnd);
            eventObservable = Observable.from(eventArray);
            this.logger.log(`Fetched ${eventArray.length} events`);
        }
        return eventObservable;
    }
    selectFrom(arr) {
        const len = arr.length;
        const selection = Math.floor(Math.random() * len);
        return arr[selection];
    }
    selectFromAndRemove(arr) {
        if (arr === undefined) {
            return [undefined, undefined];
        }
        const len = arr.length;
        const selectionIndex = Math.floor(Math.random() * len);
        const selection = arr[selectionIndex];
        let mutatedArray = arr.slice(0, selectionIndex).concat(arr.slice(selectionIndex + 1));
        return [selection, mutatedArray];
    }
    shallowCopyArray(arr) {
        return arr.slice();
    }
    generateHumanName() {
        return this.selectFrom(this.firstNamePool) + ' ' + this.selectFrom(this.lastNamePool);
    }
    generateEventName() {
        return this.selectFrom(this.eventTitlePool) + ' ' + this.selectFrom(this.eventSubtitlePool);
    }
    generateEventType() {
        return this.selectFrom(this.eventTypePool);
    }
    generateEvent(start, end, selectedResource) {
        const generatedEventType = this.generateEventType();
        const eventTypeAbbreviation = this.abbreviationMap[generatedEventType];
        let event = {
            id: Math.ceil(Math.random() * 10000000).toString(16),
            name: this.generateEventName(),
            organizer: this.generateHumanName(),
            type: generatedEventType,
            typeAbbreviation: eventTypeAbbreviation,
            start: start,
            end: end,
            repeating: false,
            primaryResource: selectedResource,
        };
        return event;
    }
    generateEventArray(rangeStart, rangeEnd) {
        let events = [];
        // set rangeStart to 12am on day of rangeStart,
        // set rangeEnd to 11:59pm on day of rangeEnd
        rangeStart.startOf('day');
        rangeEnd.endOf('day');
        let currentDay = rangeStart.clone();
        while (currentDay.isBefore(rangeEnd)) {
            for (let startTime = 8; startTime < 16; startTime += 4) {
                let availResources = this.shallowCopyArray(this.resourcesPool);
                let eventStart = currentDay.clone();
                let eventEnd = currentDay.clone();
                eventStart.hour(startTime);
                eventEnd.hour(startTime).add(2, 'hours');
                let continueProbability = 0.9;
                while (Math.random() > (1 - continueProbability)) {
                    let [resource, mutatedArray] = this.selectFromAndRemove(availResources);
                    let event;
                    if (resource !== undefined) {
                        event = this.generateEvent(eventStart, eventEnd, resource);
                        events.push(event);
                        availResources = mutatedArray;
                    }
                    // probability of further events falls as events are generated
                    // to even out distribution across days
                    continueProbability -= 0.02;
                }
            }
            // increment while loop
            currentDay.add(1, 'day');
        }
        return events;
    }
};
BackendService = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [Logger])
], BackendService);
//# sourceMappingURL=backend.service.js.map