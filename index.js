import express from 'express';
import { sequelize } from './config/db.js';
import { router } from './routes/Routes.js';

//import { Sync } from './models/Sync.js';

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(router);

// sequelize.authenticate();

app.get('/', (req, res) => {
    res.send("Catalog-Web-API");
});

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});