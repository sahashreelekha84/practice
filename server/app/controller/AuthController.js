const { hashedpassword, comparedpassword } = require("../middleware/AuthCheck")
const userModel = require("../model/userModel")
const jwt = require('jsonwebtoken')
const { generateOtp, sendEmail } = require("../utils/Sendemail")
const roleModel = require("../model/roleModel")
const Admin = require("../model/Admin")
class AuthController {
    async register(req, res) {
        try {
            const { name, email, password, phone } = req.body
            const existemail = await userModel.findOne({ email })
            if (existemail)
                return res.status(400).json({
                    status: false,
                    message: 'email has already exist'
                })
            const hash = hashedpassword(password)
            const userRole = await roleModel.findOne({ name: "user" });
            const otp = generateOtp()
            // const otpExpiry = new Date(Date.now() + 10 * 60 * 1000)
            const otpExpiry = new Date(Date.now() + 10 * 60 * 1000)
            console.log(otpExpiry.toString());
            const udata = new userModel({
                name, email, phone, password: hash, otp, otpExpiry, roleId: userRole?._id,
            })
            await sendEmail({ to: email, name: name, otp: otp, password: password })
            const data = await udata.save()
            return res.status(201).json({
                status: true,
                message: 'user registered successfully',
                data: data
            })
        }
        catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }
    async verifyemail(req, res) {
        try {
            const { email, otp } = req.body
            console.log(otp);

            const user = await userModel.findOne({ email })
            if (!user) {
                return res.status(400).json({
                    status: false,
                    message: 'user not found'
                })
            }
            if (user.isVerify) {
                return res.status(400).json({
                    status: false,
                    message: 'user already verified'
                })
            }
            if (String(user.otp) !== String(otp)) {
                return res.status(400).json({
                    status: false,
                    message: 'invalied otp'
                })
            }
            if (user.otpExpiry < Date.now()) {
                return res.status(400).json({
                    status: false,
                    message: 'otp expired'
                })
            }
            user.isVerify = true,
                user.otp = undefined
            user.otpExpiry = undefined
            await user.save();
            return res.status(200).json({
                status: true,
                message: 'email verified successfully'
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }
    async resendotp(req, res) {
        const { email } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                status: false,
                message: 'user not found'
            })
        }
        if (user.isVerify) {
            return res.status(400).json({
                status: false,
                message: 'user already verified'
            })
        }
        const otp = generateOtp()
        user.otp = otp;
        user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000)
        await user.save()
        await sendEmail({
            to: user.email, name: user.name, otp: otp
        })
        return res.status(200).json({
            message: 'otp send successfully'
        })
    }
    async login(req, res) {
        try {
            const { email, password } = req.body
            console.log(password);

            const user = (await userModel.findOne({ email }))
            if (!user) {
                return res.status(400).json({
                    status: false,
                    message: 'user not found'
                })
            }
            const ismatch = await comparedpassword(password, user.password)
            if (!ismatch) {
                return res.status(400).json({
                    status: false,
                    message: 'invalid password'
                })
            }
            // if (!user.isVerify) {
            //     return res.status(400).json({
            //         status: false,
            //         message: 'pls verify the mail'
            //     })
            // }
            const role = await roleModel.findById(user.roleId)
            console.log(role);

            const token = jwt.sign({
                _id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                roleId: user.roleId,
                roleName: role?.name,
                permissions: role?.permissions || [],
            }, process.env.JWT_SECRECT_KEY, { expiresIn: '2h' })
            return res.status(200).json({
                status: true,
                message: 'user login successfully',
                user: {
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    roleId: user.roleId,
                    roleName: role?.name,
                    permissions: role?.permissions || [],
                },
                token
            })
        }
        catch (error) {
            return res.status(400).json({
                status: false,
                message: error.message
            })
        }
    }
    async dashboard(req, res) {
        try {
            console.log(req.user);

            return res.status(200).json({
                status: true,
                message: 'Welcome to user Dashboard',
                data: req.user
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message,

            })
        }
    }
    async adminlogin(req, res) {
        try {
            const { email, password } = req.body
            console.log(password);

            const user = (await Admin.findOne({ email }))
            if (!user) {
                return res.status(400).json({
                    status: false,
                    message: 'user not found'
                })
            }
            const ismatch = await comparedpassword(password, user.password)
            if (!ismatch) {
                return res.status(400).json({
                    status: false,
                    message: 'invalid password'
                })
            }
            // if (!user.isVerify) {
            //     return res.status(400).json({
            //         status: false,
            //         message: 'pls verify the mail'
            //     })
            // }
            const role = await roleModel.findById(user.roleId)
            console.log(role);

            const token = jwt.sign({
                _id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                roleId: user.roleId,
                roleName: role?.name,
                permissions: role?.permissions || [],
            }, process.env.JWT_SECRECT_KEY, { expiresIn: '2h' })
            return res.status(200).json({
                status: true,
                message: user.firstLogin
                    ? "Please set your password"
                    : "Login successful",
                user: {
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    roleId: user.roleId,
                    roleName: role?.name,
                    permissions: role?.permissions || [],
                },
                token
            })
        }
        catch (error) {
            return res.status(400).json({
                status: false,
                message: error.message
            })
        }
    }
    async setpassword(req, res) {
        try {
            const { password } = req.body
            const userId = req.user._id
            const user = await Admin.findById(userId)
            if (!user) {
                return res.status(400).json({ message: 'user not found' })
            }
            if (!user.firstLogin) {
                return res.status(400).json({ message: 'password already reset' })
            }
            user.password = hashedpassword(password)
            user.firstLogin = false
            await user.save()
            return res.status(200).json({ message: 'password reset successfully' })
        } catch (error) {
            console.log(error);

        }
    }
}
module.exports = new AuthController()