import * as express from 'express';
import * as checkJwt from 'express-jwt';
import { secret } from "../config/main";
import { tripQuery } from "../tripQuery/tripQuery";
import { User, Station, Reservation, Trip } from "../db/db";

export const router = express.Router();

router.post('/trip-query', (req, res) => {
    tripQuery(req)
        .then(trip => {
            res.send(trip)
        })
        .catch(err => {
            res.send({ error: "Sorry, no reservations available at this time." })
        })
});

router.use(checkJwt({ secret }));

router.post('/confirm-book', (req, res) => {
    const tripId = req.body.tripId;
    const userId = req.user;
    Trip.findById(tripId)
        .then(trip => trip.update({ userId }))
        .then(() => {
            res.json({message: 'success'})
        })
        .catch(err => res.json({error: err }))
});

router.get('trips', (req, res) => {
    const userId = req.user;
    Trip.findAll({where: { userId }}).then(trips => {
        res.json(trips)
    })
});

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

router.get('/trips', (req, res) => {
    Trip.findAll().then(trips => {
        res.json(trips);
    })
        .catch(err => console.log("\n\n", err))
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

router.use((err, req, res, next) => {
    if (err.name === 'Unauthorized Error') {
        console.log("\n\nI'm inside here\n\n")
        res.json({error: err.message })
    }
});


