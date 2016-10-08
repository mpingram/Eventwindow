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
var EventViewerComponent = (function () {
    function EventViewerComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], EventViewerComponent.prototype, "eventBuffer", void 0);
    EventViewerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'em-event-viewer',
            templateUrl: 'event-viewer.component.html',
            styleUrls: ['event-viewer.component.css',
                '../../shared/styles/datepicker.component.css'],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], EventViewerComponent);
    return EventViewerComponent;
}());
exports.EventViewerComponent = EventViewerComponent;
//# sourceMappingURL=event-viewer.component.js.map