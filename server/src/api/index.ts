import express from "express";

import AgencyRouter from "@src/routes/agency.route";
import ServiceRouter from "@src/routes/service.route";
const router = express.Router();

router.use("/agency", AgencyRouter);
router.use("/service", ServiceRouter);

export default router;
