"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getMinutesFromSeconds_1 = require("./getMinutesFromSeconds");
var constants_1 = require("./constants");
var getIncrements_1 = require("./getIncrements");
var multiplyIncrementsByPrice_1 = require("./multiplyIncrementsByPrice");
exports.getBicyclingPrice = function (seconds) {
    var minutes = getMinutesFromSeconds_1.getMinutesFromSeconds(seconds);
    var increments = getIncrements_1.getIncrements(minutes, constants_1.constants.INCREMENT_SIZE);
    return multiplyIncrementsByPrice_1.multiplyIncrementsByPrice(increments, constants_1.constants.PRICE_PER_INCREMENT);
};
//# sourceMappingURL=getBicyclingPrice.js.map