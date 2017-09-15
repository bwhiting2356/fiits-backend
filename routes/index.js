"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var tripQueryRequest_1 = require("../functions/tripQueryRequest");
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
router.post('/reservation/', function (req, res) {
    var _a = req.body, userId = _a.userId, stationId = _a.stationId;
    var station, result;
    Station.findById(stationId).then(function (s) {
        station = s;
    });
    Reservation.findAll({
        where: {
            stationId: stationId,
            status: 'pending'
        }
    }).then(function (reservations) {
        result = testInventory(reservations, station, req.body);
    });
    if (result) {
        Reservation.create().then(function (reservation) {
            res.json(reservation);
        });
    }
    else {
        res.json({
            response: "Can't create a reservation, sorry"
        });
    }
});
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
var options = {
    origin: true,
    methods: ['POST'],
    credentials: true,
    maxAge: 3600
};
router.post('/trip-query', function (req, res) {
    var tqr = {
        origin: req.body.origin,
        destination: req.body.destination,
        time: new Date(req.body.time),
        timeTarget: req.body.timeTarget
    };
    // TODO: object destructuring?
    tripQueryRequest_1.tripQueryRequest(tqr).then(function (tripQueryResponse) {
        var response = res.send(tripQueryResponse);
    });
});
module.exports = router;
//# sourceMappingURL=index.js.map