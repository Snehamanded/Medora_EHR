const { ReE, ReS } = require("../services/util.service.js");
const auth = require("../middleware/auth.middleware.js");
const model = require("../models/index");
const { sendRegistrationEmail } = require("../middleware/mailer.middleware");

// ✅ Add a new User (with Patient handling)
const add = async (req, res) => {
    const t = await model.sequelize.transaction();
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            mobile,
            userType,     // string like "Patient", "Doctor"
            userTypeId,   // optional id if passed directly
            dateOfBirth,
            gender,
            patientTypeId // optional, for Patient model
        } = req.body;

        // 1. Resolve userTypeId
        let resolvedUserTypeId = userTypeId;
        if (userType) {
            const type = await model.UserType.findOne({ where: { name: userType } });
            if (!type) {
                await t.rollback();
                return ReE(res, "Invalid userType", 400);
            }
            resolvedUserTypeId = type.id;
        }

        // 2. Hash password
        const passwordHash = await auth.hashPassword(password);

        // 3. Create User
        const user = await model.User.create(
            {
                firstName,
                lastName,
                email,
                passwordHash,
                userTypeId: resolvedUserTypeId,
                phone: mobile,
            },
            { transaction: t }
        );

        // 4. If Patient, create Patient entry
        if (userType && userType.toLowerCase() === "patient") {
            await model.Patient.create(
                {
                    userId: user.id,
                    patientTypeId: patientTypeId || 1, // fallback default
                    firstName: user.firstName,
                    lastName: user.lastName || "",
                    dateOfBirth: dateOfBirth || null,
                    gender: gender || null,
                    contactNumber: user.phone,
                    email: user.email,
                },
                { transaction: t }
            );
        }

        // 5. Send registration email
        await sendRegistrationEmail({ body: { email } }, null, () => {});

        // 6. Generate tokens
        const tokens = auth.generateTokens(user);

        await t.commit();
        return ReS(res, { user, tokens }, 201);
    } catch (error) {
        await t.rollback();
        return ReE(res, error.message, 422);
    }
};

module.exports.add = add;

// ✅ Sign in user
const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find user
        const user = await model.User.findOne({ where: { email, isDeleted: false } });
        if (!user) return ReE(res, "User not found", 404);

        // 2. Compare password
        const isMatch = await auth.comparePassword(password, user.passwordHash);
        if (!isMatch) return ReE(res, "Invalid credentials", 401);

        // 3. Update last login
        user.lastLogin = new Date();
        await user.save();

        // 4. Generate tokens
        const tokens = auth.generateTokens(user);

        return ReS(res, { user, tokens }, 200);
    } catch (error) {
        return ReE(res, error.message, 401);
    }
};

module.exports.signin = signin;

// ✅ Fetch all Users
const fetchAll = async (req, res) => {
    try {
        const users = await model.User.findAll({
            where: { isDeleted: false },
            include: [{ model: model.UserType, as: "userType" }],
            order: [["createdAt", "DESC"]],
        });
        return ReS(res, { success: true, data: users }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};

module.exports.fetchAll = fetchAll;

// ✅ Fetch single user
const fetchSingle = async (req, res) => {
    try {
        const user = await model.User.findByPk(req.params.id, {
            include: [{ model: model.UserType, as: "userType" }],
        });
        if (!user || user.isDeleted) return ReE(res, "User not found", 404);
        return ReS(res, user, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};

module.exports.fetchSingle = fetchSingle;

// ✅ Update User
const updateUser = async (req, res) => {
    try {
        const user = await model.User.findByPk(req.params.id);
        if (!user || user.isDeleted) return ReE(res, "User not found", 404);

        let passwordHash = user.passwordHash;
        if (req.body.password) {
            passwordHash = await auth.hashPassword(req.body.password);
        }

        await user.update({
            firstName: req.body.firstName || user.firstName,
            lastName: req.body.lastName || user.lastName,
            email: req.body.email || user.email,
            passwordHash,
            phone: req.body.mobile || user.phone,
            userTypeId: req.body.userTypeId || user.userTypeId,
        });

        return ReS(res, user, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};

module.exports.updateUser = updateUser;

// ✅ Soft delete user
const deleteUser = async (req, res) => {
    try {
        const user = await model.User.findByPk(req.params.id);
        if (!user || user.isDeleted) return ReE(res, "User not found", 404);

        await user.update({ isDeleted: true });
        return ReS(res, "User deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};

module.exports.deleteUser = deleteUser;
