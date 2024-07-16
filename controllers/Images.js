import { 
    getImages,
    getImageById,
    addImage,
    updateImage,
    deleteImage
} from "../services/Images.js";

export default {
    getImages : async (req, res, next) => {
        try {
            const images = await getImages();
            if (images.length > 0)
                return res.status(200).json(images);
            return res.status(404).json({ "message": "Images not found" });
        } catch (err) {
            console.error(`Error while getting Images: ${err}`);
            return res.status(500).json({"message": `Error while getting Images. Err: ${err}`});
        }
    },
    getImageById : async (req, res, next) => {
        try {
            const image = await getImageById(req.params.id);
            if (image)
                return res.status(200).json(image);
            return res.status(404).json({ "message": "Image not found" });
        } catch (err) {
            console.error(`Error while getting Image: ${err}`);
            return res.status(500).json({"message": `Error while getting Image. Err: ${err}`});
        }
    },
    addImage : async (req, res, next) => {
        try {
            const image = await addImage(req.body);
            return res.status(201).json(image);
        } catch (err) {
            console.error(`Error while adding Image: ${err}`);
            return res.status(500).json({"message": `Error while adding Image. Err: ${err}`});
        }
    },
    updateImage : async (req, res, next) => {
        try {
            const image = await getImageById(req.params.id);
            if (!image)
                return res.status(404).json({ "message": "Image not found" });
            const updatedImage = await updateImage(image, req.body);
            return res.status(202).json(updatedImage);
        } catch (err) {
            console.error(`Error while adding Image: ${err}`);
            return res.status(500).json({"message": `Error while updating Image. Err: ${err}`});
        }
    },
    deleteImage : async (req, res, next) => {
        try {
            const image = await getImageById(req.params.id);
            if (!image)
                return res.status(404).json({ "message": "Image not found" });
            await deleteImage(req.params.id)
            return res.status(200).json({ "message": "Image deleted successfully" });
        } catch (err) {
            console.error(`Error while deleting Image: ${err}`);
            return res.status(500).json({"message": `Error while deleting Image. Err: ${err}`});
        }
    }
};