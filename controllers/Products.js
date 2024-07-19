import { 
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductsImagesDiscounts
} from "../services/Products.js";

export default {
    getProducts : async (req, res, next) => {
        try {
            const products = await getProducts();
            if (products.length > 0)
                return res.status(200).json(products);
            return res.status(404).json({ "message": "Products not found" });
        } catch (err) {
            console.error(`Error while getting products: ${err}`);
            return res.status(500).json({"message": `Error while getting products. Err: ${err}`});
        }
    },
    getProductById : async (req, res, next) => {
        try {
            const product = await getProductById(req.params.id);
            if (product)
                return res.status(200).json(product);
            return res.status(404).json({ "message": "Product not found" });
        } catch (err) {
            console.error(`Error while getting product: ${err}`);
            return res.status(500).json({"message": `Error while getting product. Err: ${err}`});
        }
    },
    addProduct : async (req, res, next) => {
        try {
            const product = await addProduct(req.body);
            return res.status(201).json(product);
        } catch (err) {
            console.error(`Error while adding product: ${err}`);
            return res.status(500).json({"message": `Error while adding product. Err: ${err}`});
        }
    },
    updateProduct : async (req, res, next) => {
        try {
            const product = await getProductById(req.params.id);
            if (!product)
                return res.status(404).json({ "message": "Product not found" });
            const updatedProduct = await updateProduct(product, req.body);
            return res.status(202).json(updatedProduct);
        } catch (err) {
            console.error(`Error while adding product: ${err}`);
            return res.status(500).json({"message": `Error while updating product. Err: ${err}`});
        }
    },
    deleteProduct : async (req, res, next) => {
        try {
            const product = await getProductById(req.params.id);
            if (!product)
                return res.status(404).json({ "message": "Product not found" });
            await deleteProduct(req.params.id)
            return res.status(200).json({ "message": "Product deleted successfully" });
        } catch (err) {
            console.error(`Error while deleting product: ${err}`);
            return res.status(500).json({"message": `Error while deleting product. Err: ${err}`});
        }
    },
    getProductsImagesDiscounts : async (req, res, next) => {
        try {
            const products = await getProductsImagesDiscounts();
            if (products.length > 0)
                return res.status(200).json(products);
            return res.status(404).json({ "message": "Products not found" });
        } catch (err) {
            console.error(`Error while getting products: ${err}`);
            return res.status(500).json({"message": `Error while getting products. Err: ${err}`});
        }
    }
};