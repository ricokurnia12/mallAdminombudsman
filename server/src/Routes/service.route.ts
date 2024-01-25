import { Router } from "express";
import {
  createServiceController,
  getAllService,
  removeService,
} from "@src/controllers/service.controller";

const router = Router();

router.get("/", getAllService);
router.post("/add", createServiceController);
router.delete("/delete/:id", removeService);

export default router;
