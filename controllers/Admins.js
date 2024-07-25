import { 
    getAdmins,
    getAdminById,
    addAdmin,
    updateAdmin,
    deleteAdmin,
    getAdminByEmail
} from "../services/Admins.js";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from 'bcrypt';

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jsonwebtoken.sign({ id }, 'temporary secret', {
        expiresIn: maxAge
    });
};

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
            await updateAdmin(admin, req.body);
            const { password, ...newAdmin } = admin.toJSON();
            return res.status(202).json(newAdmin);
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
    },
    signupPost : async (req, res, next) => {
        try {
            const admin = await addAdmin(req.body);
            const token = createToken(admin.id);
            console.log(token);
            res.cookie('jwt', token, {
                maxAge: maxAge * 1000,
                httpOnly: true
            });
            return res.status(201).json({ admin: admin.id });
        } catch (err) {
            console.error(`Error while adding Admin: ${err}`);
            return res.status(500).json({"message": `Error while adding Admin. Err: ${err}`});
        }
    },
    loginPost : async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const admin = await getAdminByEmail(email);
            if (admin) {
                const auth = await bcrypt.compare(password, admin.password);
                if (auth) {
                    const token = createToken(admin.id);
                    res.cookie('jwt', token, {
                        maxAge: maxAge * 1000,
                        httpOnly: true
                    });
                    return res.status(200).json({admin: admin.id})
                }
                return res.status(401).json({ "message": "Invalid credentials" });
            }
            return res.status(404).json({ "message": "Admin not found" });
        } catch (err) {
            console.error(`Error while logging Admin: ${err}`);
            return res.status(500).json({"message": `Error while logging Admin. Err: ${err}`});
        }
    }
};