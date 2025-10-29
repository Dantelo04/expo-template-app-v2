import { Router } from "express";
import recordsController from "../controllers/records.controller";

const router = Router();

router.get("/records/user/:id", recordsController.getRecordsFromUser);
router.post("/records", recordsController.createRecord);
router.put("/records/:id", recordsController.updateRecord);
router.delete("/records/:id", recordsController.deleteRecord);
router.post("/records/many", recordsController.createManyRecords);
router.delete("/records/many", recordsController.deleteManyRecords);

export default router;