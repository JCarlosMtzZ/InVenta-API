import multer from "multer";

export const handleMulterErrors = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ errors: [{ msg: `Multer error occurred: ${err.message}` }] });
    } else if (err) {
        return res.status(500).json({ errors: [{ msg: `Unknown error occurred: ${err.message}` }] });
    }
    next();
};