"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var checkJwt = require("express-jwt");
var main_1 = require("../../config/main");
var db_1 = require("../../db/db");
var tripQuery_1 = require("./tripQuery/tripQuery");
var cacheCoords_1 = require("./cacheCoords/cacheCoords");
exports.router = express.Router();
exports.router.post('/trip-query', function (req, res) {
    tripQuery_1.tripQuery(req)
        .then(function (trip) {
        res.send(trip);
    })
        .catch(function (err) {
        res.send({ error: "Sorry, no reservations available at this time." });
    });
    // TODO: add a property to the trip if it's still temporary and will expire
    // TODO: add UI showing the countdown of the expiration time
});
exports.router.post('/cache-coords', function (req, res) {
    cacheCoords_1.cacheCoords(req);
    res.send("cached successly");
});
exports.router.use(checkJwt({ secret: main_1.secret }));
exports.router.post('/confirm-book', function (req, res) {
    var tripId = req.body.tripId;
    var userId = req.user;
    db_1.Trip.findById(tripId)
        .then(function (trip) { return trip.update({ userId: userId }); })
        .then(function () {
        res.json({ message: 'success' });
    })
        .catch(function (err) { return res.json({ error: err }); });
});
exports.router.get('trips', function (req, res) {
    var userId = req.user;
    db_1.Trip.findAll({ where: { userId: userId } }).then(function (trips) {
        res.json(trips);
    });
});
exports.router.get('/users', function (req, res) {
    db_1.User.findAll().then(function (users) {
        res.json(users);
    });
});
exports.router.get('/user/:id', function (req, res) {
    var id = req.params.id;
    db_1.User.findById(id).then(function (user) {
        res.json(user);
    });
});
exports.router.get('/stations', function (req, res) {
    db_1.Station.findAll().then(function (stations) {
        res.json(stations);
    });
});
exports.router.get('/station/:id', function (req, res) {
    var id = req.params.id;
    db_1.Station.findById(id).then(function (station) {
        res.json(station);
    });
});
exports.router.get('/reservations', function (req, res) {
    db_1.Reservation.findAll().then(function (reservations) {
        res.json(reservations);
    });
});
exports.router.get('/reservation/:id', function (req, res) {
    var id = req.params.id;
    db_1.Reservation.findById(id).then(function (reservation) {
        res.json(reservation);
    });
});
exports.router.get('/trips', function (req, res) {
    db_1.Trip.findAll().then(function (trips) {
        res.json(trips);
    })
        .catch(function (err) { return console.log("\n\n", err); });
});
exports.router.get('/trip/:id', function (req, res) {
    var id = req.params.id;
    db_1.Trip.findById(id).then(function (trip) {
        res.json(trip);
    });
});
exports.router.post('/trip/', function (req, res) {
    db_1.Trip.create(req.body).then(function (trip) {
        res.json(trip);
    });
});
exports.router.use(function (err, req, res, next) {
    if (err.name === 'Unauthorized Error') {
        console.log("\n\nI'm inside here\n\n");
        res.json({ error: err.message });
    }
});
//# sourceMappingURL=api.js.map