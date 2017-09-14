"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../db/db");
exports.getStationDataFromDB = function () {
    return db_1.Station.findAll({ attributes: ['id', 'lat', 'lng', 'capacity', 'currentInv'] });
};
//# sourceMappingURL=getStationDataFromDB.js.map