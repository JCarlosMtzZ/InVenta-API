import { 
    getCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoriesSummariesByDateRange
} from "../services/Categories.js";

export default {
    getCategories : async (req, res, next) => {
        try {
            const categories = await getCategories();
            if (categories.length > 0)
                return res.status(200).json(categories);
            return res.status(404).json({ "message": "Categories not found" });
        } catch (err) {
            console.error(`Error while getting Categories: ${err}`);
            return res.status(500).json({"message": `Error while getting Categories. Err: ${err}`});
        }
    },
    getCategoryById : async (req, res, next) => {
        try {
            const category = await getCategoryById(req.params.id);
            if (category)
                return res.status(200).json(category);
            return res.status(404).json({ "message": "Category not found" });
        } catch (err) {
            console.error(`Error while getting Category: ${err}`);
            return res.status(500).json({"message": `Error while getting Category. Err: ${err}`});
        }
    },
    addCategory : async (req, res, next) => {
        try {
            const category = await addCategory(req.body);
            return res.status(201).json(category);
        } catch (err) {
            console.error(`Error while adding Category: ${err}`);
            return res.status(500).json({"message": `Error while adding Category. Err: ${err}`});
        }
    },
    updateCategory : async (req, res, next) => {
        try {
            const category = await getCategoryById(req.params.id);
            if (!category)
                return res.status(404).json({ "message": "Category not found" });
            const updatedCategory = await updateCategory(category, req.body);
            return res.status(202).json(updatedCategory);
        } catch (err) {
            console.error(`Error while adding Category: ${err}`);
            return res.status(500).json({"message": `Error while updating Category. Err: ${err}`});
        }
    },
    deleteCategory : async (req, res, next) => {
        try {
            const category = await getCategoryById(req.params.id);
            if (!category)
                return res.status(404).json({ "message": "Category not found" });
            await deleteCategory(req.params.id)
            return res.status(200).json({ "message": "Category deleted successfully" });
        } catch (err) {
            console.error(`Error while deleting Category: ${err}`);
            return res.status(500).json({"message": `Error while deleting Category. Err: ${err}`});
        }
    },
    getCategoriesSummariesByDateRange : async (req, res, next) => {
        try {
            let startDate = req.query.startdate;
            let endDate = req.query.enddate;

            if (!startDate)
                startDate = new Date(0);
            if (!endDate)
                endDate = new Date();

            const summaries = await getCategoriesSummariesByDateRange(new Date(startDate), new Date(endDate));

            if (summaries.length > 0)
                return res.status(200).json(summaries);
            return res.status(404).json({ "message": "Categories summaries not found" });
        } catch (err) {
            console.error(`Error while getting Categories summaries: ${err}`);
            return res.status(500).json({"message": `Error while getting Categories summaries. Err: ${err}`});
        }
    },
};