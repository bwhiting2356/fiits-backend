"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.originAddressOrCoords = function (tripQueryRequest) {
    return tripQueryRequest.originAddress !== 'Current Location'
        ? tripQueryRequest.originAddress
        : tripQueryRequest.originCoords;
};
//# sourceMappingURL=originAddressOrCoords.js.map