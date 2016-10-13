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
var EventListItemComponent = (function () {
    function EventListItemComponent() {
    }
    EventListItemComponent.prototype.openEventDetail = function () {
        // DEBUG
        console.log(JSON.stringify(this.event, null, 4));
    };
    EventListItemComponent.prototype.dateToClockTime = function (momentObj) {
        return momentObj.format('h mm');
    };
    EventListItemComponent.prototype.dateToAMPM = function (momentObj) {
        return momentObj.format('a');
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], EventListItemComponent.prototype, "event", void 0);
    EventListItemComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'em-event-list-item',
            templateUrl: 'event-list-item.component.html',
            styleUrls: ['event-list-item.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], EventListItemComponent);
    return EventListItemComponent;
}());
exports.EventListItemComponent = EventListItemComponent;
//# sourceMappingURL=event-list-item.component.js.map