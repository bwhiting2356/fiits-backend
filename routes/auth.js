"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var jwt = require("jsonwebtoken");
var db_1 = require("../db/db");
var router = express.Router();
router.post('/register', function (req, res) {
    var user = req.body;
    db_1.User.create(user).then(function (user) {
        var token = jwt.sign(user.id, 'SECRET');
    });
});
module.exports = router;
//# sourceMappingURL=auth.js.map