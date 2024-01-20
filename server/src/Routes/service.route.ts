import { Router } from "express";
import {
  addServices,
  getAllService,
  removeService,
} from "@src/controllers/service.controller";

const router = Router();

router.get("/", getAllService);
router.post("/add", addServices);
router.delete("/delete/:id", removeService);

export default router;
