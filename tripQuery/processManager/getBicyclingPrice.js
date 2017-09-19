"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PRICE_PER_10_MINUTES = -0.10;
exports.getBicyclingPrice = function (duration) {
    var minutes = duration / 60;
    var tenMinIncrements = Math.ceil(minutes / 10);
    return tenMinIncrements * PRICE_PER_10_MINUTES;
};
//# sourceMappingURL=getBicyclingPrice.js.map