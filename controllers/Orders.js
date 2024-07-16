import { 
    getOrders,
    getOrderById,
    addOrder,
    updateOrder,
    deleteOrder
} from "../services/Orders.js";

export default {
    getOrders : async (req, res, next) => {
        try {
            const orders = await getOrders();
            if (orders.length > 0)
                return res.status(200).json(orders);
            return res.status(404).json({ "message": "Orders not found" });
        } catch (err) {
            console.error(`Error while getting Orders: ${err}`);
            return res.status(500).json({"message": `Error while getting Orders. Err: ${err}`});
        }
    },
    getOrderById : async (req, res, next) => {
        try {
            const order = await getOrderById(req.params.id);
            if (order)
                return res.status(200).json(order);
            return res.status(404).json({ "message": "Order not found" });
        } catch (err) {
            console.error(`Error while getting Order: ${err}`);
            return res.status(500).json({"message": `Error while getting Order. Err: ${err}`});
        }
    },
    addOrder : async (req, res, next) => {
        try {
            const order = await addOrder(req.body);
            return res.status(201).json(order);
        } catch (err) {
            console.error(`Error while adding Order: ${err}`);
            return res.status(500).json({"message": `Error while adding Order. Err: ${err}`});
        }
    },
    updateOrder : async (req, res, next) => {
        try {
            const order = await getOrderById(req.params.id);
            if (!order)
                return res.status(404).json({ "message": "Order not found" });
            const updatedOrder = await updateOrder(order, req.body);
            return res.status(202).json(updatedOrder);
        } catch (err) {
            console.error(`Error while adding Order: ${err}`);
            return res.status(500).json({"message": `Error while updating Order. Err: ${err}`});
        }
    },
    deleteOrder : async (req, res, next) => {
        try {
            const order = await getOrderById(req.params.id);
            if (!order)
                return res.status(404).json({ "message": "Order not found" });
            await deleteOrder(req.params.id)
            return res.status(200).json({ "message": "Order deleted successfully" });
        } catch (err) {
            console.error(`Error while deleting Order: ${err}`);
            return res.status(500).json({"message": `Error while deleting Order. Err: ${err}`});
        }
    }
};