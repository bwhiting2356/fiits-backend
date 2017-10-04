"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var Sequelize = require("sequelize");
var bcrypt = require("bcrypt");
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
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
            notEmpty: true,
            len: [1, 255]
        },
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 255]
        }
    },
    balance: {
        type: Sequelize.DECIMAL,
        defaultValue: 10.00
    }
}, {
    instanceMethods: {
        validPassword: function (password) {
            return bcrypt.compareSync(password, _this.password);
        }
    }
});
exports.User.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
// User.prototype.validPassword = (password) => {
//     console.log("\n\n")
//     console.log(password)
//     console.log("\n\n")
//     console.log(this)
//     console.log("\n\n")
//     return bcrypt.compareSync(password, this.password);
// };
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
exports.Trip = exports.sequelize.define('trip', {
    tripData: {
        type: Sequelize.JSON
    },
});
exports.Trip.belongsTo(exports.User);
exports.Reservation.belongsTo(exports.Trip);
exports.Reservation.belongsTo(exports.Station);
exports.DistanceMatrixCache = exports.sequelize.define('distance-matrix-cache', {
    query: {
        type: Sequelize.JSON,
        allowNull: false,
        unique: true
    },
    result: {
        type: Sequelize.JSON,
        allowNull: false
    }
});
exports.sequelize.sync({ force: true })
    .then(function () {
    exports.Station.bulkCreate(stationData_1.stationDataList);
});
//# sourceMappingURL=db.js.map