"use strict";
var Event = (function () {
    function Event(properties) {
        for (var x in properties) {
            if (properties.hasOwnProperty(x)) {
                this[x] = properties[x];
            }
        }
    }
    return Event;
}());
exports.Event = Event;
//# sourceMappingURL=event.js.map