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
exports.mergeResultsWithIds = function (results, stations) {
    var mergedResults = [];
    for (var i = 0; i < results.length; i++) {
        mergedResults.push(__assign({ id: stations[i].id }, results[i]));
    }
    return mergedResults;
};
//# sourceMappingURL=mergeResultsWithIds.js.map