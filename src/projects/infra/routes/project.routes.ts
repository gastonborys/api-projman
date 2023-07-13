import { Router } from "express";
import { MongoRepository } from "../repository/mongo.repository";
import { ProjectController } from "../controller/project.controller";
import { ProjectService } from "../../app/project.service";

// Middlewares
import listMiddleware from "../middlewares/list.middleware";
import readwriteMiddleware from "../middlewares/read-write.middleware";
import newremoveMiddleware from "../middlewares/new-remove.middleware";

const router = Router();

const projectRespository   = new MongoRepository();

const projectService       = new ProjectService(projectRespository);

const projectController    = new ProjectController(projectService);

router.get('/', listMiddleware, projectController.list);
router.get('/:id', readwriteMiddleware, projectController.show);
router.put('/:id', readwriteMiddleware, projectController.update);
router.put('/', readwriteMiddleware, projectController.changePassword);
router.post('/', projectController.create);
router.delete('/:id', newremoveMiddleware, projectController.remove);


export default router;

