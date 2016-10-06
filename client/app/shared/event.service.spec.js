"use strict";
var event_service_1 = require('./event.service');
// for mocking
var backend_service_1 = require('./backend.service');
var logger_service_1 = require('./logger.service');
describe('Isolated tests of EventService', function () {
    var eventService;
    var logger = new logger_service_1.Logger();
    var backendService = new backend_service_1.BackendService(logger);
    var mockBackendService = {};
    // covering basic functionality with real-deal service
    describe('with real backendService', function () {
        beforeEach(function () {
            eventService = new event_service_1.EventService(backendService, logger);
        });
        // FIXME: Holy Crockford have patience with my dumb ass
        it('should return an EventBuffer with the same number of original events in it', function (done) {
            var start = moment();
            var end = start.clone().add(14, 'days');
            function countItems(nestedArray) {
                var numEvents = 0;
                for (var i = 0; i < nestedArray.length; i++) {
                    numEvents += nestedArray[i].length;
                }
                return numEvents;
            }
            // Typescript hack to access private methods
            // Used here due to the fact that each call to backendService.getEvents
            // randomly generates a new set of events
            // FIXME: remove when testing with non-randomly generated backend service
            var convertToBuffer = eventService["convertToBuffer"];
            backendService.getEvents(start, end)
                .then(function (eventArray) {
                var eventBuffer = convertToBuffer(eventArray);
                var eventBufferCount = countItems(eventBuffer);
                var eventArrayCount = eventArray.length;
                expect(eventBufferCount).toEqual(eventArrayCount);
            }).then(done);
        });
    });
    describe('with mock backendService', function () {
        beforeEach(function () {
            eventService = new event_service_1.EventService(mockBackendService, logger);
        });
        // FIXME: implement
    });
});
//# sourceMappingURL=event.service.spec.js.map