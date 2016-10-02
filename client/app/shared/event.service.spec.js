"use strict";
var event_service_1 = require('./event.service');
// for mocking
var backend_service_1 = require('./backend.service');
var logger_service_1 = require('./logger.service');
describe('Isolated tests of EventService', function () {
    var eventService;
    var logger = new logger_service_1.Logger();
    var backendService = new backend_service_1.BackendService(logger);
    var mockBackendService;
    describe('with mock backendService', function () {
        beforeEach(function () {
            eventService = new event_service_1.EventService(mockBackendService, logger);
        });
        mockBackendService = {
            getEvents: function (rangeStart, rangeEnd) {
            }
        };
        it('should work on a basic level', function () {
        });
    });
    // covering basic functionality with real-deal service
    describe('with real backendService', function () {
        beforeEach(function () {
            eventService = new event_service_1.EventService(backendService, logger);
        });
    });
});
//# sourceMappingURL=event.service.spec.js.map