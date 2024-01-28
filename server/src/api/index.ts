import express from "express";
import AgencyRouter from "@src/Routes/agency.route";
import ServiceRouter from "@src/Routes/service.route";
const router = express.Router();

router.use("/agency", AgencyRouter);
router.use("/service", ServiceRouter);

export default router;
