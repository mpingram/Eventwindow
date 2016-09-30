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
var event_list_scroll_component_1 = require('./event-list-scroll.component');
var EventListComponent = (function () {
    function EventListComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], EventListComponent.prototype, "eventBuffer", void 0);
    EventListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'em-event-list',
            templateUrl: 'event-list.component.html',
            styleUrls: ['event-list.component.css'],
            directives: [event_list_scroll_component_1.EventListScrollComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], EventListComponent);
    return EventListComponent;
}());
exports.EventListComponent = EventListComponent;
//# sourceMappingURL=event-list.component.js.map