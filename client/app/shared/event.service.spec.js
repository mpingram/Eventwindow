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
    var start;
    var end;
    // covering basic functionality with real-deal service
    describe('with real backendService', function () {
        var eventBuffer;
        beforeEach(function () {
            eventService = new event_service_1.EventService(backendService, logger);
            // FIXME: doesn't work for whatever reason
            start = moment();
            end = start.clone().add(14, 'days');
            eventBuffer = eventService.loadEventBuffer(start, end);
        });
        it('should return an EventBuffer with the same number of original events in it', function (done) {
            function test(eventArray) {
                var numEvents = 0;
                var expectedNumEvents = eventArray.length;
                for (var i = 0; i < eventBuffer.length; i++) {
                    numEvents += eventBuffer[i].length;
                }
                var condition = numEvents === expectedNumEvents;
                expect(condition).toBe(true);
            }
            function failTest(error) {
                expect(error).toBeUndefined();
            }
            backendService.getEvents(start, end)
                .then(test)
                .catch(failTest)
                .then(done);
        });
    });
    describe('with mock backendService', function () {
        // FIXME: implement
    });
});
//# sourceMappingURL=event.service.spec.js.map