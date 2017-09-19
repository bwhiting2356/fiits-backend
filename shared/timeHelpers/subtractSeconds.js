"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subtractSeconds = function (time, seconds) {
    return new Date(time.getTime() - (seconds * 1000));
};
//# sourceMappingURL=subtractSeconds.js.map