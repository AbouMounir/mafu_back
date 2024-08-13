import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';


// Fonction pour créer un jeton JWT
const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "720h", // Durée de validité du token
    });
};

/* const getUsers = (async (req, res) => {
    await User.find({}).then(item => res.status(200).json({ data: item }))
}) */

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
        res.status(200).json({
            message: "user found"
        })
    }
    res.status(400).json({
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
        User.findOne({ _id: req.userId })
            .then(
                async user => {
                    console.log(user);
                    user.image = req.body.image || user.image;
                    user.userEmail = req.body.userEmail || user.userEmail;
                    user.userFirstName = req.body.userFirstName || user.userFirstName;
                    user.userLastName = req.body.userLastName || user.userLastName;
                    user.userNumber = req.body.userNumber || user.userNumber;
                    user.userLocation = req.body.userLocation || user.userLocation;
                    await user.save();
                    res.status(200).json({
                        data: user
                    })
                }
            )
            .catch(error => console.log(error))
    } catch (error) {
        console.log(error);
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
        console.log(error);
    }
})

const signupUser = (async (req, res) => {
    const existingUser = await User.findOne({ userEmail: req.body.userEmail });
    if (existingUser) {
        return res.json({ message: "User already exists" });
    }
    if (req.body.userPassword !== req.body.userPasswordC) {
        return res.status(400).json({ message: 'mot de passe incorrect' })
    }
    if (req.body.userPassword === req.body.userPasswordC) {
        bcrypt.hash(req.body.userPassword, 10)
            .then(async hash => {
                const user = new User({
                    userEmail: req.body.userEmail,
                    userNumber: req.body.userNumber,
                    userFirstName: req.body.userFirstName,
                    userLastName: req.body.userLastName,
                    userPassword: hash
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
        if (valid === false) {
            res.status().json({ message: 'mot de passe et/ou email incorrect' })
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

