import express from 'express';

export const imagesRouter = express.Router();

imagesRouter.get('/', (req, res) => {
    res.send('Images');
});