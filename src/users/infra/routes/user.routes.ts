import { Router } from "express";
import { MongoRepository } from "../repository/mongo.repository";
import { UserController } from "../controller/user.controller";
import { UserService } from "../../app/user.service";

// Middlewares
import listMiddleware from "../middlewares/list.middleware";
import readwriteMiddleware from "../middlewares/read-write.middleware";
import newremoveMiddleware from "../middlewares/new-remove.middleware";

const router = Router();

const userRespository   = new MongoRepository();

const userService       = new UserService(userRespository);

const userController    = new UserController(userService);

router.get('/', listMiddleware, userController.list);
router.get('/:id', readwriteMiddleware, userController.show);
router.put('/:id', readwriteMiddleware, userController.update);
router.put('/', readwriteMiddleware, userController.changePassword);
router.post('/', userController.create);
router.delete('/:id', newremoveMiddleware, userController.remove);


export default router;

