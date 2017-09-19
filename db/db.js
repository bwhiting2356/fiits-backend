"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sequelize = require("sequelize");
exports.sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    // SQLite only
    storage: 'db.sqlite'
});
var stationData_1 = require("../mock-data/stationData");
var reservationStatus_1 = require("../shared/reservationStatus");
var eventType_1 = require("../shared/eventType");
exports.User = exports.sequelize.define('user', {
    name: Sequelize.STRING
});
exports.Station = exports.sequelize.define('station', {
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    currentInv: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    capacity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    lat: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: { min: -90, max: 90 }
    },
    lng: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: { min: -180, max: 180 }
    },
});
exports.Reservation = exports.sequelize.define('reservation', {
    time: {
        type: Sequelize.DATE(),
        defaultValue: new Date(),
    },
    type: {
        type: Sequelize.ENUM(eventType_1.EventType.pickup, eventType_1.EventType.dropoff),
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM(reservationStatus_1.ReservationStatus.fulfilled, reservationStatus_1.ReservationStatus.cancelled, reservationStatus_1.ReservationStatus.missed, reservationStatus_1.ReservationStatus.pending, reservationStatus_1.ReservationStatus.temporary),
        defaultValue: reservationStatus_1.ReservationStatus.pending
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
});
var Trip = exports.sequelize.define('trip', {
    startLat: {
        type: Sequelize.FLOAT(),
        allowNull: true
    },
    startLon: {
        type: Sequelize.FLOAT(),
        allowNull: true
    },
    startTime: {
        type: Sequelize.DATE(),
        allowNull: true
    },
    reservation1: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    reservation2: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    endLat: {
        type: Sequelize.FLOAT(),
        allowNull: true
    },
    endLon: {
        type: Sequelize.FLOAT(),
        allowNull: true
    },
    endTime: {
        type: Sequelize.DATE(),
        allowNull: true
    }
});
Trip.belongsTo(exports.User);
exports.Reservation.belongsTo(exports.User);
exports.Reservation.belongsTo(exports.Station);
exports.sequelize.sync({ force: true })
    .then(function () {
    exports.Station.bulkCreate(stationData_1.stationDataList);
});
//# sourceMappingURL=db.js.map