"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var db_1 = require("../../db/db");
var main_1 = require("../../config/main");
exports.router = express.Router();
exports.router.post('/signup', function (req, res) {
    var userCredentials = req.body;
    db_1.User.create({
        email: userCredentials.email,
        password: db_1.User.generateHash(userCredentials.password)
    }).then(function (user) {
        var token = jwt.sign(user.dataValues.id, main_1.secret);
        res.send({ token: token });
    }).catch(function (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.json({ error: "email already in use" });
        }
        else {
            res.json({ error: 'server error' });
        }
    });
});
exports.router.post('/login', function (req, res) {
    if (req.body.email && req.body.password) {
        db_1.User.findOne({ where: { email: req.body.email } })
            .then(function (user) {
            if (!user) {
                res.json({ error: 'user not found' });
            }
            else if (!bcrypt.compareSync(req.body.password, user.dataValues.password)) {
                res.json({ error: 'incorrect password' });
            }
            else {
                var token = jwt.sign(user.dataValues.email, main_1.secret);
                return res.json({ token: token });
            }
        }).catch(function (err) { return res.send(err); });
    }
    else {
        res.json({ error: 'email and password are required' });
    }
});
//# sourceMappingURL=auth.js.map