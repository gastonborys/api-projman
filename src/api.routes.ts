import { Router } from "express";
import { MongoRepository } from "./users/infra/repository/mongo.repository";
import { UserController } from "./users/infra/controller/user.controller";
import {UserService} from "./users/app/user.service";
const router = Router();

const userRespository   = new MongoRepository();

const userService       = new UserService(userRespository);

const userController    = new UserController(userService);

router.post('/login',           userController.login);
router.post('/register',        userController.register);

export default router;

