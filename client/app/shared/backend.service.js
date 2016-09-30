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
var logger_service_1 = require('./logger.service');
var event_1 = require('./event');
var mock_event_generator_service_1 = require('./mock-event-generator.service');
var BackendService = (function () {
    function BackendService(logger, 
        // mock
        mockGenerator) {
        this.logger = logger;
        this.mockGenerator = mockGenerator;
    }
    //
    BackendService.prototype.getAll = function (type) {
        if (type === event_1.Event) {
            // FIXME: mock
            var EVENTS = this.mockGenerator.generateBuffer(14);
            return Promise.resolve(EVENTS);
        }
        var err = new Error('Cannot get object of this type');
        this.logger.error(err);
        throw err;
    };
    BackendService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [logger_service_1.Logger, mock_event_generator_service_1.MockEventGeneratorService])
    ], BackendService);
    return BackendService;
}());
exports.BackendService = BackendService;
//# sourceMappingURL=backend.service.js.map