import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { User } from "../db/db";
const router = express.Router();

router.post('/register', (req, res) => {
    const user = req.body;
    User.create(user).then(user => {
        const token = jwt.sign(user.id, 'SECRET');
    })

});

module.exports = router;
