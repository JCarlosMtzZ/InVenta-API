import { bucketClient } from '../config/bucket.js';
import dotenv from 'dotenv';
dotenv.config();

const namespaceName = process.env.BUCKET_NAMESPACE_NAME;
const bucketName = process.env.BUCKET_NAME;

export const getFileByName = async (name) => {
    const params = {
        namespaceName: namespaceName,
        bucketName: bucketName,
        objectName: name
    };
    const file = await bucketClient.getObject(params);
    return file;
};

export const getFilesByPrefix = async (prefix) => {
    const params = {
        namespaceName: namespaceName,
        bucketName: bucketName,
        prefix: prefix,
    };
    const files = await bucketClient.listObjects(params);
    return files;
};

export const addProductFile = async (file, prefix, suffix) => {
    const objectName = `${prefix}-${suffix}`;
    const params = {
        namespaceName: namespaceName,
        bucketName: bucketName,
        putObjectBody: file,
        objectName: objectName
    };
    const newFile = await bucketClient.putObject(params);
    if (newFile)
        return objectName;
    return null;
};

export const deleteFile = async (name) => {
    const params = {
        namespaceName: namespaceName,
        bucketName: bucketName,
        objectName: name
    };
    await bucketClient.deleteObject(params);
};