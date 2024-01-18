import { Router } from "express";
import {
  addAgency,
  deleteAgency,
  getAllAgencies,
  editAgency,
  getAgencyById,
} from "../controller/Agency.controller";

const router = Router();

router.get("/", getAllAgencies);
router.post("/add", addAgency);
router.delete("/:id", deleteAgency);
router.put("/:id", editAgency);
router.get("/:id", getAgencyById);

export default router;
