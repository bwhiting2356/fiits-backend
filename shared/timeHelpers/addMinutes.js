"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var addSeconds_1 = require("./addSeconds");
exports.addMinutes = function (time, minutes) {
    return addSeconds_1.addSeconds(time, 60 * minutes);
};
//# sourceMappingURL=addMinutes.js.map