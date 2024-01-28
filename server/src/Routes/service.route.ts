import { Router } from "express";
import {
  createServiceController,
  getAllService,
  removeService,
  getServiceById,
  getAgencyServiceController,
} from "@src/controllers/service.controller";

const router = Router();

router.get("/", getAllService);
router.get("/:id", getServiceById);
router.post("/add", createServiceController);
router.delete("/delete/:id", removeService);
router.get("/agency/:id", getAgencyServiceController);

export default router;
