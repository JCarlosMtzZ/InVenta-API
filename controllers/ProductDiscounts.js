import { 
    getProductDiscounts,
    getProductDiscountById,
    addProductDiscount,
    updateProductDiscount,
    deleteProductDiscount
} from "../services/ProductDiscounts.js";

export default {
    getProductDiscounts : async (req, res, next) => {
        try {
            const productDiscounts = await getProductDiscounts();
            if (productDiscounts.length > 0)
                return res.status(200).json(productDiscounts);
            return res.status(404).json({ "message": "ProductDiscounts not found" });
        } catch (err) {
            console.error(`Error while getting ProductDiscounts: ${err}`);
            return res.status(500).json({"message": `Error while getting ProductDiscounts. Err: ${err}`});
        }
    },
    getProductDiscountById : async (req, res, next) => {
        try {
            const productDiscount = await getProductDiscountById(req.params.id);
            if (productDiscount)
                return res.status(200).json(productDiscount);
            return res.status(404).json({ "message": "ProductDiscount not found" });
        } catch (err) {
            console.error(`Error while getting ProductDiscount: ${err}`);
            return res.status(500).json({"message": `Error while getting ProductDiscount. Err: ${err}`});
        }
    },
    addProductDiscount : async (req, res, next) => {
        try {
            const productDiscount = await addProductDiscount(req.body);
            return res.status(201).json(productDiscount);
        } catch (err) {
            console.error(`Error while adding ProductDiscount: ${err}`);
            return res.status(500).json({"message": `Error while adding ProductDiscount. Err: ${err}`});
        }
    },
    updateProductDiscount : async (req, res, next) => {
        try {
            const productDiscount = await getProductDiscountById(req.params.id);
            if (!productDiscount)
                return res.status(404).json({ "message": "ProductDiscount not found" });
            const updatedProductDiscount = await updateProductDiscount(productDiscount, req.body);
            return res.status(202).json(updatedProductDiscount);
        } catch (err) {
            console.error(`Error while adding ProductDiscount: ${err}`);
            return res.status(500).json({"message": `Error while updating ProductDiscount. Err: ${err}`});
        }
    },
    deleteProductDiscount : async (req, res, next) => {
        try {
            const productDiscount = await getProductDiscountById(req.params.id);
            if (!productDiscount)
                return res.status(404).json({ "message": "ProductDiscount not found" });
            await deleteProductDiscount(req.params.id)
            return res.status(200).json({ "message": "ProductDiscount deleted successfully" });
        } catch (err) {
            console.error(`Error while deleting ProductDiscount: ${err}`);
            return res.status(500).json({"message": `Error while deleting ProductDiscount. Err: ${err}`});
        }
    }
};