import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
export const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// app.set('view engine', 'html');

const mainRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');

app.use('/api', mainRoutes);
app.use('/auth', authRoutes);

// app.use((err, req, res, next) => {
//     res.locals.error = err;
//     res.status(err.status);
//     res.send('error');
// });

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});

