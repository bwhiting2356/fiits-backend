import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { User } from "../../db/db";
import { secret } from "../../config/main";

export const router = express.Router();

router.post('/signup', (req, res) => {
    const userCredentials = req.body;

    User.create({
        email: userCredentials.email,
        password: User.generateHash(userCredentials.password)
    }).then(user => {
        const token = jwt.sign(user.dataValues.id, secret );
        res.send({ token });
    }).catch(err => {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.json({error: "email already in use"})
        } else {
            res.json({error: 'server error'})
        }
    });
});

router.post('/login', (req, res) => {
    if (req.body.email && req.body.password) {
        User.findOne({where: { email: req.body.email}})
            .then(user => {
                if (!user) {
                    res.json({ error: 'user not found'})
                } else if (!bcrypt.compareSync(req.body.password, user.dataValues.password)) {
                    res.json({ error: 'incorrect password'})
                } else {
                    const token = jwt.sign(user.dataValues.email, secret );
                    return res.json({ token })
                }
            }).catch(err => res.send(err))
    } else {
        res.json({error: 'email and password are required'})
    }
});
