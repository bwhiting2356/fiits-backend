"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var tripQuery_1 = require("../tripQuery/tripQuery");
var router = express.Router();
var _a = require('../db/db'), User = _a.User, Station = _a.Station, Reservation = _a.Reservation, Trip = _a.Trip;
router.get('/users', function (req, res) {
    User.findAll().then(function (users) {
        res.json(users);
    });
});
router.get('/user/:id', function (req, res) {
    var id = req.params.id;
    User.findById(id).then(function (user) {
        res.json(user);
    });
});
router.get('/stations', function (req, res) {
    Station.findAll().then(function (stations) {
        res.json(stations);
    });
});
router.get('/station/:id', function (req, res) {
    var id = req.params.id;
    Station.findById(id).then(function (station) {
        res.json(station);
    });
});
router.get('/reservations', function (req, res) {
    Reservation.findAll().then(function (reservations) {
        res.json(reservations);
    });
});
router.get('/reservation/:id', function (req, res) {
    var id = req.params.id;
    Reservation.findById(id).then(function (reservation) {
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
router.get('/trips', function (req, res) {
    Trip.findAll().then(function (trips) {
        res.json(trips);
    });
});
router.get('/trip/:id', function (req, res) {
    var id = req.params.id;
    Trip.findById(id).then(function (trip) {
        res.json(trip);
    });
});
router.post('/trip/', function (req, res) {
    Trip.create(req.body).then(function (trip) {
        res.json(trip);
    });
});
router.post('/trip-query', function (req, res) {
    tripQuery_1.tripQuery(req).then(function (tripQueryResponse) {
        var response = res.send(tripQueryResponse);
    }).catch(function (err) {
        res.send({ error: "Sorry, no reservations available at this time." });
    });
});
module.exports = router;
//# sourceMappingURL=index.js.map