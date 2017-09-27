"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTripQueryRequest = function (req) {
    return __assign({}, req.body, { time: new Date(req.body.time) });
};
//# sourceMappingURL=parseTripQueryRequest.js.map