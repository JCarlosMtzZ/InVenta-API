import { 
    getAdmins,
    getAdminById,
    addAdmin,
    updateAdmin,
    deleteAdmin
} from "../services/Admins.js";

export default {
    getAdmins : async (req, res, next) => {
        try {
            const admins = await getAdmins();
            if (admins.length > 0)
                return res.status(200).json(admins);
            return res.status(404).json({ "message": "Admins not found" });
        } catch (err) {
            console.error(`Error while getting Admins: ${err}`);
            return res.status(500).json({"message": `Error while getting Admins. Err: ${err}`});
        }
    },
    getAdminById : async (req, res, next) => {
        try {
            const admin = await getAdminById(req.params.id);
            if (admin)
                return res.status(200).json(admin);
            return res.status(404).json({ "message": "Admin not found" });
        } catch (err) {
            console.error(`Error while getting Admin: ${err}`);
            return res.status(500).json({"message": `Error while getting Admin. Err: ${err}`});
        }
    },
    addAdmin : async (req, res, next) => {
        try {
            const admin = await addAdmin(req.body);
            return res.status(201).json(admin);
        } catch (err) {
            console.error(`Error while adding Admin: ${err}`);
            return res.status(500).json({"message": `Error while adding Admin. Err: ${err}`});
        }
    },
    updateAdmin : async (req, res, next) => {
        try {
            const admin = await getAdminById(req.params.id);
            if (!admin)
                return res.status(404).json({ "message": "Admin not found" });
            const updatedAdmin = await updateAdmin(admin, req.body);
            return res.status(202).json(updatedAdmin);
        } catch (err) {
            console.error(`Error while adding Admin: ${err}`);
            return res.status(500).json({"message": `Error while updating Admin. Err: ${err}`});
        }
    },
    deleteAdmin : async (req, res, next) => {
        try {
            const admin = await getAdminById(req.params.id);
            if (!admin)
                return res.status(404).json({ "message": "Admin not found" });
            await deleteAdmin(req.params.id)
            return res.status(200).json({ "message": "Admin deleted successfully" });
        } catch (err) {
            console.error(`Error while deleting Admin: ${err}`);
            return res.status(500).json({"message": `Error while deleting Admin. Err: ${err}`});
        }
    }
};