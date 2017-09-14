"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var teststatus_1 = require("./shared/teststatus");
exports.buildTestState = function (data, station, request) {
    return {
        originalQueue: data,
        deferredQueue: [],
        currentInv: station.currentInv,
        test: {
            status: teststatus_1.TestStatus.pending,
            lastTestResult: undefined,
            lastCheckedTime: request.currentTime
        }
    };
};
//# sourceMappingURL=buildTestState.js.map