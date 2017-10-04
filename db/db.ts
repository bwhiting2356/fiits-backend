import * as Sequelize from 'sequelize';
import * as bcrypt from 'bcrypt';

export const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    // SQLite only
    storage: 'db.sqlite'
});

import { stationDataList } from '../mock-data/stationData';

import { ReservationStatus } from '../shared/reservationStatus';
import { EventType } from '../shared/eventType';

export const User = sequelize.define('user', {
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
            notEmpty: true,
            len: [1,255]
        },
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1,255]
        }
    },
    balance: {
        type: Sequelize.DECIMAL,
        defaultValue: 10.00
    }
}, {
    instanceMethods: {
        validPassword: (password) => {
            return bcrypt.compareSync(password, this.password);
        }
    }
});

User.generateHash = (password) => {
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

export const Station = sequelize.define('station', {
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

export const Reservation = sequelize.define('reservation', {
    time: {
        type: Sequelize.DATE(),
        defaultValue: new Date(),
    },
    type: {
        type: Sequelize.ENUM(
            EventType.pickup,
            EventType.dropoff
        ),
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM(
            ReservationStatus.fulfilled,
            ReservationStatus.cancelled,
            ReservationStatus.missed,
            ReservationStatus.pending,
            ReservationStatus.temporary
        ),
        defaultValue: ReservationStatus.pending
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
});

export const Trip = sequelize.define('trip', {
    tripData: {
        type: Sequelize.JSON
    },
});

Trip.belongsTo(User);

Reservation.belongsTo(Trip);
Reservation.belongsTo(Station);

export const DistanceMatrixCache = sequelize.define('distance-matrix-cache', {
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

sequelize.sync({ force: true })
    .then(() => {
        Station.bulkCreate(stationDataList);
    });
