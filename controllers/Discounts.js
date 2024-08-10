import { 
    getDiscounts,
    getPreviousDiscounts,
    getCurrentDiscounts,
    getNextDiscounts,
    getDiscountById,
    addDiscount,
    updateDiscount,
    deleteDiscount
} from "../services/Discounts.js";

export default {
    getDiscounts : async (req, res, next) => {
        try {
            let discounts = [];
            const validity = req.query.validity;
            if (validity === 'previous')
                discounts = await getPreviousDiscounts();
            else if (validity === 'current')
                discounts = await getCurrentDiscounts();
            else if (validity === 'next')
                discounts = await getNextDiscounts();
            else
                discounts = await getDiscounts();
            if (discounts.length > 0)
                return res.status(200).json(discounts);
            return res.status(404).json({ "message": "Discounts not found" });
        } catch (err) {
            console.error(`Error while getting Discounts: ${err}`);
            return res.status(500).json({"message": `Error while getting Discounts. Err: ${err}`});
        }
    },
    getDiscountById : async (req, res, next) => {
        try {
            const discount = await getDiscountById(req.params.id);
            if (discount)
                return res.status(200).json(discount);
            return res.status(404).json({ "message": "Discount not found" });
        } catch (err) {
            console.error(`Error while getting Discount: ${err}`);
            return res.status(500).json({"message": `Error while getting Discount. Err: ${err}`});
        }
    },
    addDiscount : async (req, res, next) => {
        try {
            const discount = await addDiscount(req.body);
            return res.status(201).json(discount);
        } catch (err) {
            console.error(`Error while adding Discount: ${err}`);
            return res.status(500).json({"message": `Error while adding Discount. Err: ${err}`});
        }
    },
    updateDiscount : async (req, res, next) => {
        try {
            const discount = await getDiscountById(req.params.id);
            if (!discount)
                return res.status(404).json({ "message": "Discount not found" });
            const updatedDiscount = await updateDiscount(discount, req.body);
            return res.status(202).json(updatedDiscount);
        } catch (err) {
            console.error(`Error while adding Discount: ${err}`);
            return res.status(500).json({"message": `Error while updating Discount. Err: ${err}`});
        }
    },
    deleteDiscount : async (req, res, next) => {
        try {
            const discount = await getDiscountById(req.params.id);
            if (!discount)
                return res.status(404).json({ "message": "Discount not found" });
            await deleteDiscount(req.params.id)
            return res.status(200).json({ "message": "Discount deleted successfully" });
        } catch (err) {
            console.error(`Error while deleting Discount: ${err}`);
            return res.status(500).json({"message": `Error while deleting Discount. Err: ${err}`});
        }
    }
};