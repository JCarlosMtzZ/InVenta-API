import { 
    getOrderItems,
    getOrderItemById,
    addOrderItem,
    updateOrderItem,
    deleteOrderItem
} from "../services/OrderItems.js";

export default {
    getOrderItems : async (req, res, next) => {
        try {
            const orderItems = await getOrderItems();
            if (orderItems.length > 0)
                return res.status(200).json(orderItems);
            return res.status(404).json({ "message": "OrderItems not found" });
        } catch (err) {
            console.error(`Error while getting OrderItems: ${err}`);
            return res.status(500).json({"message": `Error while getting OrderItems. Err: ${err}`});
        }
    },
    getOrderItemById : async (req, res, next) => {
        try {
            const orderItem = await getOrderItemById(req.params.id);
            if (orderItem)
                return res.status(200).json(orderItem);
            return res.status(404).json({ "message": "OrderItem not found" });
        } catch (err) {
            console.error(`Error while getting OrderItem: ${err}`);
            return res.status(500).json({"message": `Error while getting OrderItem. Err: ${err}`});
        }
    },
    addOrderItem : async (req, res, next) => {
        try {
            const orderItem = await addOrderItem(req.body);
            return res.status(201).json(orderItem);
        } catch (err) {
            console.error(`Error while adding OrderItem: ${err}`);
            return res.status(500).json({"message": `Error while adding OrderItem. Err: ${err}`});
        }
    },
    updateOrderItem : async (req, res, next) => {
        try {
            const orderItem = await getOrderItemById(req.params.id);
            if (!orderItem)
                return res.status(404).json({ "message": "OrderItem not found" });
            const updatedOrderItem = await updateOrderItem(orderItem, req.body);
            return res.status(202).json(updatedOrderItem);
        } catch (err) {
            console.error(`Error while adding OrderItem: ${err}`);
            return res.status(500).json({"message": `Error while updating OrderItem. Err: ${err}`});
        }
    },
    deleteOrderItem : async (req, res, next) => {
        try {
            const orderItem = await getOrderItemById(req.params.id);
            if (!orderItem)
                return res.status(404).json({ "message": "OrderItem not found" });
            await deleteOrderItem(req.params.id)
            return res.status(200).json({ "message": "OrderItem deleted successfully" });
        } catch (err) {
            console.error(`Error while deleting OrderItem: ${err}`);
            return res.status(500).json({"message": `Error while deleting OrderItem. Err: ${err}`});
        }
    }
};