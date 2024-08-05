import { 
    addProductFile,
    deleteFile,
    getFileByName,
    getFilesByPrefix
} from "../services/Files.js";
import { cleanupFiles } from "../middleware/multer/util.js";
import fs from 'fs';
import path from 'path';

export default {
    getFilesByPrefix : async (req, res, next) => {
        try {
            const result = await getFilesByPrefix(req.params.prefix);
            let files = [];
            if (result)
                files = result.listObjects.objects;
            if (files.length > 0)
                return res.status(200).json(files);
            return res.status(404).json({ "message": "Files not found" });
        } catch (err) {
            console.error(`Error while getting Files: ${err}`);
            return res.status(500).json({"message": `Error while getting Files. Err: ${err}`});
        }
    },
    addProductFiles : async (req, res, next) => {
        try {
            const currentProductFiles = await getFilesByPrefix(req.body.prefix);
            const currentFilesCount = currentProductFiles.listObjects.objects.length;
            for (let i=currentFilesCount+1; i<=req.files.length+currentFilesCount; i++) {
                const fileStream = fs.createReadStream(req.files[i-currentFilesCount-1].path);
                const fileExtension = path.extname(req.files[i-currentFilesCount-1].originalname);
                const newFile = await addProductFile(fileStream, req.body.prefix, i + fileExtension);
                if (!newFile)
                    throw new Error('Error while uploading files to bucket');
            }
            cleanupFiles(req.files);
            return res.status(201).json({"message": "Files uploaded successfully"});
        } catch (err) {
            console.error(`Error while adding File: ${err}`);
            return res.status(500).json({"message": `Error while adding Files. Err: ${err}`});
        }
    },
    deleteFile : async (req, res, next) => {
        try {
            await deleteFile(req.params.name);
            return res.status(200).json({"message": "File deleted successfully"});
        } catch (err) {
            console.error(`Error while deleting File: ${err}`);
            return res.status(500).json({"message": `Error while deleting File. Err: ${err}`});
        }
    }
};