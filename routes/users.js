import express from 'express';
import { deleteUser, getUser, getUsers, signinUser, signupUser, updateUser, updateUserPassword } from '../controlleurs/users.js';
const routerUser = express.Router()

routerUser.get(('/'), getUsers)
routerUser.get(('/:id'), getUser)
routerUser.delete(('/delete/:id'), deleteUser)
routerUser.put(('/update-user/:id'), updateUser)
routerUser.put(('/update-password/:id'), updateUserPassword)
routerUser.post(('/signup'), signupUser)
routerUser.post(('/signin'), signinUser)

export default routerUser