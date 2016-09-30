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
var event_list_day_component_1 = require('./event-list-day.component');
var event_list_item_component_1 = require('./event-list-item.component');
var event_list_multi_item_component_1 = require('./event-list-multi-item.component');
var EventListScrollComponent = (function () {
    function EventListScrollComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], EventListScrollComponent.prototype, "eventBuffer", void 0);
    EventListScrollComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'em-event-list-scroll',
            directives: [event_list_day_component_1.EventListDayComponent, event_list_item_component_1.EventListItemComponent, event_list_multi_item_component_1.EventListMultiItemComponent],
            templateUrl: 'event-list-scroll.component.html',
            styleUrls: ['event-list-scroll.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], EventListScrollComponent);
    return EventListScrollComponent;
}());
exports.EventListScrollComponent = EventListScrollComponent;
//# sourceMappingURL=event-list-scroll.component.js.map