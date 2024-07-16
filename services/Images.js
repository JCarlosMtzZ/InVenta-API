import { v4 as uuidv4 } from 'uuid';
import { Image } from '../models/Image.js';

export const getImages = async () => {
    const images = await Image.findAll();
    return images;
};

export const getImageById = async (id) => {
    const image = await Image.findByPk(id);
    return image;
};

export const addImage = async (body) => {
    const id = uuidv4();
    const {
        url,
        productId
    } = body;
    const newImage = await Image.create({
        id,
        url,
        productId
    });
    return newImage;
};

export const updateImage = async (image, body) => {
    image.set(body);
    await image.save();
    return image;
};

export const deleteImage = async (id) => {
    await Image.destroy({
        where: { id }
    });
};