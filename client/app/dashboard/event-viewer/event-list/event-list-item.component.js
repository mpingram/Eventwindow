var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { DashboardStateService } from '../../shared-dashboard/dashboard-state.service';
export let EventListItemComponent = class EventListItemComponent {
    constructor(dashboardState) {
        this.dashboardState = dashboardState;
    }
    openEventDetail($event) {
        $event.stopPropagation();
        // DEBUG
        console.log(JSON.stringify(this.event, null, 4));
    }
    dateToClockTime(momentObj) {
        return momentObj.format('h:mm');
    }
    dateToAMPM(momentObj) {
        return momentObj.format('a');
    }
    ngOnInit() {
        this.eventTypeColor = this.dashboardState.getColorOf(this.event.type);
    }
};
__decorate([
    Input(), 
    __metadata('design:type', Object)
], EventListItemComponent.prototype, "event", void 0);
EventListItemComponent = __decorate([
    Component({
        selector: 'em-event-list-item',
        templateUrl: './app/dashboard/event-viewer/event-list/event-list-item.component.html',
        styleUrls: ['./app/dashboard/event-viewer/event-list/event-list-item.component.css']
    }), 
    __metadata('design:paramtypes', [DashboardStateService])
], EventListItemComponent);
//# sourceMappingURL=event-list-item.component.js.map