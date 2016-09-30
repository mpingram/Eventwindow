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
var MockEventGeneratorService = (function () {
    function MockEventGeneratorService() {
        this.eventTitlePool = ['Rap', 'Classical Music', 'Sting and the Police', 'Baby', 'Pillow', 'Chromolithograph', 'Men', 'Bath', 'German', 'Grasshopper', 'Peer-to-Peer', 'Forestry', 'Paramedic', 'Hot Doctor', 'Jellyfish', 'Angry Bears', 'Intersectionality', 'Shirt', 'Astronaut', 'Duck', 'Fashion', 'Gentrification', 'Yoga', 'Dance', 'Balloon'];
        this.eventSubtitlePool = ['in the Hood', 'Burlesque', 'Conference', 'Discussion', 'Lecture', 'Meeting', 'Round Table', 'Viewing', 'Competition', 'Battle', ': an Exploration', 'and the Sorcerer\'s Stone', 'Class', 'Intervention', '-splaining', 'Brunch', 'Coast to Coast', 'Meditation', 'Fight', 'Teleconference', 'Reading', 'Punching', 'Dissection', 'Marathon'];
        this.firstNamePool = ['Richard', 'Flingus', 'Sid', 'Ebenezer', 'Rocky', 'Dontae', 'Margarette', 'Robin', 'Willow', 'Ola', 'Bonnie', 'Nicole', 'Diana', 'Dianna', 'Diananana', 'Michael', 'Jareth'];
        this.lastNamePool = ['Nye', 'Hatfield', 'Herring', 'Lee', 'Li', 'Heaton', 'Cohen', 'Tomlinson', 'Brenner', 'Butler', 'King', 'Morris', 'Bungleton', 'Powerhat', 'Dolphin', 'the Goblin King', 'Goethe', 'Yang', 'Brown', 'Foghorn', 'Colton', 'Dongus'];
        this.resourcesPool = ['EI', 'EII', 'EIII', 'EIV', 'WIa', 'WIb', 'WII', 'WIII', 'WIV', 'Lobby', 'Library', '120', '129'];
        this.eventTypePool = ['Class', 'Meeting', 'Internal Event', 'External Event'];
    }
    MockEventGeneratorService.prototype.selectFrom = function (arr) {
        var len = arr.length;
        var selection = Math.floor(Math.random() * len);
        return arr[selection];
    };
    MockEventGeneratorService.prototype.selectFromAndRemove = function (arr) {
        var len = arr.length;
        var selection = Math.floor(Math.random() * len);
        var output = arr[selection];
        // side effect: remove selection from array
        arr = arr.slice(0, selection).concat(arr.slice(selection + 1));
    };
    MockEventGeneratorService.prototype.shallowCopyArray = function (arr) {
        return arr.slice();
    };
    MockEventGeneratorService.prototype.generateHumanName = function () {
        return this.selectFrom(this.firstNamePool) + ' ' + this.selectFrom(this.lastNamePool);
    };
    MockEventGeneratorService.prototype.generateEventName = function () {
        return this.selectFrom(this.eventTitlePool) + ' ' + this.selectFrom(this.eventSubtitlePool);
    };
    MockEventGeneratorService.prototype.generateEvent = function (start, end, availResources) {
        var event = new event_1.Event();
        event.id = Math.ceil(Math.random() * 1000);
        event.name = this.generateEventName();
        event.organizer = this.generateHumanName();
        event.start = start;
        event.end = end;
        event.primaryResource = this.selectFrom(availResources);
        return event;
    };
    MockEventGeneratorService.prototype.generateBuffer = function (length) {
        var events = [];
        var currentDay = moment().startOf('day');
        for (var i = 0; i < length; i++) {
            for (var startTime = 8; startTime < 16; startTime += 4) {
                var start = currentDay.clone().hour(startTime);
                var end = start.clone().add(2, 'hours');
                var availResources = this.shallowCopyArray(this.resourcesPool);
                while (Math.random() > 0.1) {
                    var event_2 = this.generateEvent(start, end, availResources);
                    events.push(event_2);
                }
            }
            currentDay.add(1, 'day');
        }
        return events;
    };
    MockEventGeneratorService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MockEventGeneratorService);
    return MockEventGeneratorService;
}());
exports.MockEventGeneratorService = MockEventGeneratorService;
//# sourceMappingURL=mock-event-generator.service.js.map