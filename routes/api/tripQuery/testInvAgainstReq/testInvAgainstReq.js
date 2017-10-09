"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var teststatus_1 = require("./shared/teststatus");
var isAllowed_1 = require("./isAllowed");
var processOrDefer_1 = require("./processOrDefer");
var buildTestState_1 = require("./buildTestState");
exports.testInvAgainstReq = function (data, station, request) {
    var state = buildTestState_1.buildTestState(data, station, request);
    var checking = true;
    while (checking) {
        state = processOrDefer_1.processOrDefer(request, state); // process the next event
        if (request.requestTime <= state.test.lastCheckedTime) {
            state.test.status = teststatus_1.TestStatus.active;
        }
        if (state.test.status === teststatus_1.TestStatus.active && state.test.lastTestResult === false) {
            return state.test.lastTestResult;
        }
        if (state.originalQueue.length === 0 && state.deferredQueue.length === 0) {
            checking = false;
        }
        state = isAllowed_1.isAllowed(state, station, request); // don't redo the test until after we've made sure the last test doesn't fail
    }
    return state.test.lastTestResult;
};
//# sourceMappingURL=testInvAgainstReq.js.map