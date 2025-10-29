import { Router } from "express";
import usersController from "../controllers/users.controller";

const router = Router();


router.get("/users/:id", usersController.getUser);

router.delete("/users/:id", usersController.deleteUser);

router.put("/users/:id", usersController.updateUser);

export default router;
