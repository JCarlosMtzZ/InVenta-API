import express from 'express';

export const adminsRouter = express.Router();

adminsRouter.get('/', (req, res) => {
    res.send('Admins');
});