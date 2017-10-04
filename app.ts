import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { port } from "./config/main";
import { router as apiRoutes } from './routes/api/api';
import { router as authRoutes } from './routes/auth/auth';

export const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`The application is running on localhost:${port}!`);
});

