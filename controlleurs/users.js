import bcrypt from 'bcrypt';
import User from '../models/users.js';


const getUsers = (async(req, res) => {
    await User.find({}).then(item => res.send(item))
})

const getUser = (async (req, res) => {
    await User.findOne({ _id : req.params.id }).then(item => res.send(item));
})

const deleteUser = (async (req, res) => {
    await User.deleteOne({_id : req.params.id}).then(result => res.send(result))
})

const updateUser = (async (req,res) => {
    try {
        await User.findOne({ _id : req.params.id })
            .then(
                user => {
                    console.log(user);
                    if (req.body.userFirstName) {
                        user.userFirstName = req.body.userFirstName;
                    }
                    if (req.body.userLastName) {
                        user.userLastName = req.body.userLastName;
                    }
                    if (req.body.userNumber) {
                        user.userNumber = req.body.userNumber;
                    }
                    if (req.body.userLocation) {
                        user.userLocation = req.body.userLocation;
                    }
                    user.save();
                    res.send(user)
                }
            )
            .catch(error => console.log(error))
    } catch (error) {
        console.log(error);
    }
})

const updateUserPassword = (async (req,res) => {
    try {
        await User.findOne({ _id : req.params.id })
            .then(
                async user => {
                    const valid = await bcrypt.compare(req.body.userCurrentPassword, user.userPassword)
                    if (!valid) {
                        return res.status(500).json({ message: 'mot de passe incorrect' })
                    }
                    if (req.body.usernewPassword !== req.body.usernewPasswordC) {
                        return res.status(500).json({ message: 'entrez le même mot de passe' })
                    }
                    await bcrypt.hash(req.body.usernewPassword, 10)
                        .then(hash_new => {
                            user.userPassword = hash_new
                            user.save();
                            res.send(user)
                        })
                }
            )
            .catch(error => console.log(error))
    } catch (error) {
        console.log(error);
    }
})

const signupUser = (async (req, res) => {
    const existingUser = await User.findOne({ userEmail: req.body.userEmail });
    if (existingUser) {
        return res.json({ message: "User already exists" });
    }
    if (req.body.userPassword == req.body.userPasswordC) {
        bcrypt.hash(req.body.userPassword, 10)
            .then(async hash => {
                const user = await new User({
                    userEmail: req.body.userEmail,
                    userNumber: req.body.userNumber,
                    userFirstName: req.body.userFirstName,
                    userLastName: req.body.userLastName,
                    userPassword: hash,
                })
                await user.save()
                    .then(() => res.status(201).json({ message: 'User enregistré !' }))
                    .catch(error => res.status(400).json({ error }));
                console.log(user);
            })
            .catch(error => res.status(500).json({ error }))
    } else {
        res.status(500).json({ message: 'mot de passe incorrect' })
    }

});

const signinUser = (async (req, res) => {
    console.log('signin');
    await User.findOne({ userEmail: req.body.userEmail })
        .then(async user => {
            if (user == null) {
                res.status(500).json({ message: 'mot de passe et/ou email incorrect' })
            } else {
                const valid = await bcrypt.compare(req.body.userPassword, user.userPassword)
                console.log(valid);
                if (valid == false) {
                    res.status(400).json({ message: 'mot de passe et/ou email incorrect' })
                } else {
                    console.log(user.userPassword);
                    res.status(201).json({
                        message: 'connected',
                        data : user
                        /* userID: user._id,
                        token: jwt.sign(
                            user._id,
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        ) */
                    })
                }
            }
        }
        )
        .catch(error => res.json({ error }))
})

export { deleteUser, getUser, getUsers, signinUser, signupUser, updateUser, updateUserPassword };

