import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';
import crypto from 'crypto';

// Fonction pour créer un jeton JWT
const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "720h", // Durée de validité du token
    });
};

/* const getUsers = (async (req, res) => {
    await User.find({}).then(item => res.status(200).json({ data: item }))
}) */

// fonction pour créer un avatar pour chaque user
function getGravatarUrl(email, size = 80) {
        const trimmedEmail = email.trim().toLowerCase();
        const hash = crypto.createHash('sha256').update(trimmedEmail).digest('hex');
        return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
    }


const getUser = (async (req, res) => {
    console.log(req.userId);
    const user = await User.findOne({ _id: req.userId })
    res.status(200).json({
        data: user
    })
})

const verifyingUserNumber = (async (req, res) => {
    const user = await User.findOne({ userNumber: req.body.userNumber })
    if (user) {
        return res.status(200).json({
            message: "user found"
        })
    }
    return res.status(400).json({
        message: "user no found"
    })
})

const updateLandlordPasswordAfterForgotPassword = (async (req, res) => {
    try {
        await User.findOne({ userNumber: req.body.userNumber })
            .then(
                async user => {
                    if (!user) {
                        return res.status(404).json({ message: "user not found" })
                    }
                    if (req.body.userNewPassword !== req.body.userNewPasswordC) {
                        return res.status(400).json({ message: 'entrez le même mot de passe' })
                    }
                    await bcrypt.hash(req.body.userNewPassword, 10)
                        .then(async hash_new => {
                            user.userPassword = hash_new
                            await user.save();
                            return res.status(200).json({ data: user })
                        }).catch(error => {
                            return res.status(500).json({
                                message: "bscypt compare catch",
                                error: error.message
                            })
                        })
                }
            )
            .catch(error => {
                return res.json({
                    message: "findOne catch",
                    error: error.message
                })
            })
    } catch (error) {
        return res.json({
            message: "updateLandlordPasswordAfterForgotPassword doesn't work",
            error: error.message
        })
    }
})

const deleteUser = (async (req, res) => {
    User.deleteOne({ _id: req.req.userId })
        .then(result => res.status(200).json({
            data: result
        }))
})

const updateUser = (async (req, res) => {
    try {
        console.log(req.userId);
        User.findOne({ _id: req.userId })
            .then(
                async user => {
                    console.log(user);
                    user.image = req.body.image || user.image;
                    user.userEmail = req.body.userEmail || user.userEmail;
                    user.userName = req.body.userFullName.split(" ").join('_');
                    user.userFullName = req.body.userFullName || user.userFullName;
                    user.userNumber = req.body.userNumber || user.userNumber;
                    user.userLocation = req.body.userLocation || user.userLocation;
                    await user.save();
                    res.status(200).json({
                        data: user
                    })
                }
            )
            .catch(error => 
                res.status(500).json({
                message: "user findOne doesn't work",
                error: error.message
            }))
    } catch (error) {
        res.status(500).json({
            message: "updateUser doesn't work",
            error: error.message
        })
    }
})

const updateUserPassword = (async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.userId })
        if (!user) {
            return res.json({ message: "User don't exists" });
        }
        if (user) {
            const valid = await bcrypt.compare(req.body.userPassword, user.userPassword)
                    if (!valid) {
                        return res.status(400).json({ message: 'mot de passe incorrect' })
                    }
                    if (req.body.userNewPassword !== req.body.userNewPasswordC) {
                        return res.status(500).json({ message: 'entrez le même mot de passe' })
                    }
                    bcrypt.hash(req.body.userNewPassword, 10)
                        .then(hash_new => {
                            user.userPassword = hash_new
                            user.save();
                            res.status(200).json({
                                data: user
                            })
                        })
        }
    } catch (error) {
        res.status(500).json({
            message: "updateUserPassword doesn't work",
            error: error.message
        })
    }
})

const signupUser = (async (req, res) => {
    const existingUser = await User.findOne({$or : [{userEmail: req.body.userEmail},{userNumber: req.body.userNumber}] });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }
    if (req.body.userPassword !== req.body.userPasswordC) {
        return res.status(400).json({ message: 'mot de passe incorrect' })
    }
    if (req.body.userPassword === req.body.userPasswordC) {
        bcrypt.hash(req.body.userPassword, 10)
            .then(async hash => {
                const mailProfil = getGravatarUrl(req.body.userEmail);
                const userName = req.body.userEmail.split('@')[0] ;               
                const user = new User({
                    userEmail: req.body.userEmail,
                    userNumber: req.body.userNumber,
                    userName: userName,
                    userPassword: hash,
                    image : req.body.image || mailProfil
                })
                await user.save()
                const token = createToken(user._id)
                res.status(201).json({
                    message: 'User registered !',
                    data: user,
                    token: token
                })
            })
            .catch(err => res.status(500).json({ error: err }))
    }
});

const signinUser = (async (req, res) => {
    const user = await User.findOne({ userEmail: req.body.userEmail })
    if (!user) {
        res.status(400).json({ message: 'mot de passe et/ou email incorrect' })
    }
    if (user) {
        const valid = await bcrypt.compare(req.body.userPassword, user.userPassword)
        if (!valid) {
            res.status(400).json({ message: 'mot de passe et/ou email incorrect' })
        } else {
            console.log(user.userPassword);
            const token = createToken(user._id)
            res.status(201).json({
                message: 'User conneted!',
                data: user,
                token: token
            })
        }
    }
})

export { deleteUser, getUser, signinUser, signupUser, updateLandlordPasswordAfterForgotPassword, updateUser, updateUserPassword, verifyingUserNumber };

