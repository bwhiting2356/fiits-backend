"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataValuesFromStations = function (sequelizeStations) {
    return sequelizeStations.map(function (station) {
        return station.dataValues;
    });
};
//# sourceMappingURL=getDataValuesFromStations.js.map