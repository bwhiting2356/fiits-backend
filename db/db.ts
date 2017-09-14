import * as Sequelize from 'sequelize';
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
    name: Sequelize.STRING
});

export const Station = sequelize.define('station', {
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
    }
});

const Trip = sequelize.define('trip', {
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

Trip.belongsTo(User);

Reservation.belongsTo(User);
Reservation.belongsTo(Station);

sequelize.sync({ force: true })
    .then(() => {
        Station.bulkCreate(stationDataList);
    });
