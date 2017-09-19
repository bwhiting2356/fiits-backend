import * as express from 'express';
import {TripQueryRequest} from "../shared/tripQueryRequest";
import {tripQuery} from "../tripQuery/tripQuery";
const router = express.Router();

const { User, Station, Reservation, Trip } = require('../db/db');

router.get('/users', (req, res) => {
    User.findAll().then(users => {
        res.json(users);
    });
});

router.get('/user/:id', (req, res) => {
    const id = req.params.id;
    User.findById(id).then(user => {
        res.json(user);
    });
});

router.get('/stations', (req, res) => {
    Station.findAll().then(stations => {
        res.json(stations);
    });
});

router.get('/station/:id', (req, res) => {
    const id = req.params.id;
    Station.findById(id).then(station => {
        res.json(station);
    });
});

router.get('/reservations', (req, res) => {
    Reservation.findAll().then(reservations => {
        res.json(reservations);
    });
});

router.get('/reservation/:id', (req, res) => {
    const id = req.params.id;
    Reservation.findById(id).then(reservation => {
        res.json(reservation);
    });
});

// router.post('/reservation/', (req, res) => {
//     const { userId, stationId } = req.body;
//     let station, result;
//     Station.findById(stationId).then(s => {
//         station = s;
//     });
//     Reservation.findAll({
//         where: {
//             stationId: stationId,
//             status: 'pending'
//         }
//     }).then(reservations => {
//         result = testInventory(reservations, station, req.body);
//     });
//     if (result) {
//         Reservation.create().then(reservation => {
//             res.json(reservation)
//         });
//     } else {
//         res.json({
//             response: "Can't create a reservation, sorry"
//         });
//     }
// });

router.get('/trips', (req, res) => {
    Trip.findAll().then(trips => {
        res.json(trips);
    });
});

router.get('/trip/:id', (req, res) => {
    const id = req.params.id;
    Trip.findById(id).then(trip => {
        res.json(trip);
    });
});

router.post('/trip/', (req, res) => {
    Trip.create(req.body).then(trip => {
        res.json(trip);
    });
});

router.post('/trip-query', (req, res) => {
    tripQuery(req).then(tripQueryResponse => {
        let response = res.send(tripQueryResponse);
    }).catch(err => console.error(err))
});

module.exports = router;
