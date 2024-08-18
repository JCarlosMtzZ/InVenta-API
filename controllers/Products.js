import { 
    getProducts,
    getProductsByNameFilter,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductsCategoryImagesDiscounts,
    getProductsCategoryImagesDiscountsByNameFilter,
    getProductsCategoryImagesWithDiscounts,
    getProductsCategoryImagesByNameAndDiscountsFilter,
    getProductsCategoryImagesDiscountsByCategory,
    getProductsCategoryImagesDiscountsByNameAndCategoryIdFilter,
    getProductCategoryImagesDiscountsById,

    getTopProductsByDateRange
} from "../services/Products.js";

export default {
    getProducts : async (req, res, next) => {
        try {
            let products = [];
            const name = req.query.name;
            if (name) {
                products = await getProductsByNameFilter(name);
            } else {
                products = await getProducts();
            }
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
    getProductsCategoryImagesDiscounts : async (req, res, next) => {
        try {
            let products = [];
            const name = req.query.name;
            const filter = req.query.filter;

            if (name && filter) {
                if (filter === 'discounts')
                    products = await getProductsCategoryImagesByNameAndDiscountsFilter(name);
                else
                    products = await getProductsCategoryImagesDiscountsByNameAndCategoryIdFilter(name, filter);
            } else if (name) {
                products = await getProductsCategoryImagesDiscountsByNameFilter(name);
            } else if (filter) {
                if (filter === 'discounts')
                    products = await getProductsCategoryImagesWithDiscounts();
                else
                    products = await getProductsCategoryImagesDiscountsByCategory(filter);
            } else {
                products = await getProductsCategoryImagesDiscounts();
            }
            if (products.length > 0)
                return res.status(200).json(products);
            return res.status(404).json({ "message": "Products not found" });
        } catch (err) {
            console.error(`Error while getting products: ${err}`);
            return res.status(500).json({"message": `Error while getting products. Err: ${err}`});
        }
    },
    getProductCategoryImagesDiscountsById : async (req, res, next) => {
        try {
            const product = await getProductCategoryImagesDiscountsById(req.params.id);
            if (product)
                return res.status(200).json(product);
            return res.status(404).json({ "message": "Product not found" });
        } catch (err) {
            console.error(`Error while getting product: ${err}`);
            return res.status(500).json({"message": `Error while getting product. Err: ${err}`});
        }
    },
    getTopProductsByDateRange: async (req, res, next) => {
        try {
            let limit = req.query.limit;
            let order = req.query.order;
            let startDate = req.query.startdate;
            let endDate = req.query.enddate;

            if (!limit)
                limit = 5;
            if (!order)
                order = 'DESC';
            if (!startDate)
                startDate = new Date(0);
            if (!endDate)
                endDate = new Date();

            const products = await getTopProductsByDateRange(limit, order, new Date(startDate), new Date(endDate));

            if (products.length > 0)
                return res.status(200).json(products);
            return res.status(404).json({ "message": "Products not found" });
        } catch (err) {
            console.error(`Error while getting Products: ${err}`);
            return res.status(500).json({"message": `Error while getting Products. Err: ${err}`});
        }
    },
};