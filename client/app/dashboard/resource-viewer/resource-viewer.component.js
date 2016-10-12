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
var ResourceViewerComponent = (function () {
    function ResourceViewerComponent() {
        this._today = moment().startOf('day');
        this._date = this._today.clone();
        this._resources = this.generateResources();
    }
    Object.defineProperty(ResourceViewerComponent.prototype, "date", {
        get: function () {
            return this._date.clone();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceViewerComponent.prototype, "resources", {
        get: function () {
            return this._resources;
        },
        enumerable: true,
        configurable: true
    });
    ResourceViewerComponent.prototype.nextDay = function () {
        this._date.add(1, 'day');
    };
    ResourceViewerComponent.prototype.prevDay = function () {
        this._date.subtract(1, 'day');
    };
    ResourceViewerComponent.prototype.goToDate = function (targetDate) {
        this._date = targetDate.clone();
    };
    ResourceViewerComponent.prototype.goToToday = function () {
        this._date = this._today.clone();
    };
    // debug
    ResourceViewerComponent.prototype.generateResources = function () {
        var resourceTemplate = 'Room';
        var resources = [];
        for (var i = 1; i < 20; i++) {
            resources.push(resourceTemplate + ' ' + i);
        }
        return resources;
    };
    ResourceViewerComponent = __decorate([
        core_1.Component({
            selector: 'em-resource-viewer',
            templateUrl: './app/dashboard/resource-viewer/resource-viewer.component.html',
            styleUrls: ['./app/dashboard/resource-viewer/resource-viewer.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], ResourceViewerComponent);
    return ResourceViewerComponent;
}());
exports.ResourceViewerComponent = ResourceViewerComponent;
//# sourceMappingURL=resource-viewer.component.js.map