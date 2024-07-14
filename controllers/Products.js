import { 
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
} from "../services/Products.js";

export default {
    getProducts : async (req, res, next) => {
        try {
            const products = await getProducts();
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json({"message": `Error while getting products. Err: ${err}`});
        }
    },
    getProductById : async (req, res, next) => {
        try {
            const product = await getProductById(req.params.id);
            res.status(200).json(product);
        } catch (err) {
            res.status(500).json({"message": `Error while getting product. Err: ${err}`});
        }
    },
    addProduct : async (req, res, next) => {
        try {
            const product = await addProduct(req.body);
            res.status(201).json(product);
        } catch (err) {
            res.status(500).json({"message": `Error while adding product. Err: ${err}`});
        }
    },
    updateProduct : async (req, res, next) => {
        try {
            const product = await updateProduct(req);
            res.status(202).json(product);
        } catch (err) {
            res.status(500).json({"message": `Error while updating product. Err: ${err}`});
        }
    },
    deleteProduct : async (req, res, next) => {
        try {
            const success = await deleteProduct(req.params.id)
            if (success) {
                res.status(200).json({ "message": "Product deleted successfully" });
            } else {
                res.status(404).json({ "message": "Product not found" });
            }
        } catch (err) {
            res.status(500).json({"message": `Error while deleting product. Err: ${err}`});
        }
    }
};