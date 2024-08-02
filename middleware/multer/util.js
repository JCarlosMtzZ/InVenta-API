import fs from 'fs';

export const cleanupFiles = (files) => {
    if (files) {
        files.forEach(file => {
            fs.unlink(file.path, (err) => {
                if (err) console.error(`Error deleting file: ${file.path}`);
            });
        });
    }
};