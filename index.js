import express from 'express';
import { sequelize } from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { router } from './routes/Routes.js';

//import { Sync } from './models/Sync.js';
// sequelize.authenticate();

const PORT = 3001;
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(router);

app.get('/', (req, res) => {
    return res.send("Catalog-Web-API");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});