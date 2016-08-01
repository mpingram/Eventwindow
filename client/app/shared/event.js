"use strict";
var nextId = 1;
var Event = (function () {
    function Event(name, power) {
        this.name = name;
        this.power = power;
        this.id = nextId++;
    }
    return Event;
}());
exports.Event = Event;
//# sourceMappingURL=event.js.map