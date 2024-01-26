import { Router } from "express";
import {
  createServiceController,
  getAllService,
  removeService,
  getServiceById,
} from "@src/controllers/service.controller";

const router = Router();

router.get("/", getAllService);
router.get("/:id", getServiceById);
router.post("/add", createServiceController);
router.delete("/delete/:id", removeService);

export default router;
