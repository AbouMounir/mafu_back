import express from 'express';
import { authMiddleware } from '../controlleurs/mildeware/authMiddleware.js';
import { deleteUser, getUser, signinUser, signupUser, updateLandlordPasswordAfterForgotPassword, updateUser, updateUserPassword, verifyingUserNumber } from '../controlleurs/users.js';
const routerUser = express.Router()

//routerUser.get(('/'), getUsers)
routerUser.get(('/current'),authMiddleware, getUser)
routerUser.delete(('/current'),authMiddleware, deleteUser)
routerUser.put(('/update'),authMiddleware, updateUser)
routerUser.put(('/update-password'),authMiddleware, updateUserPassword)
routerUser.post('/verify/number',verifyingUserNumber)
routerUser.put('/forgot-password',updateLandlordPasswordAfterForgotPassword)
routerUser.post(('/signup'), signupUser)
routerUser.post(('/signin'), signinUser)

export default routerUser

/*
"userEmail":"mamadou@gmail.com"
"userNumber":"+2250777029626"
"userFirstName":"Krouma"
"userLastName":"Mamadou"
"userPassword":"5678"
*/