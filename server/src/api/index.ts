import express from "express";

import AgencyRouter from "@src/routes/agency.route";
const router = express.Router();

router.use("/agency", AgencyRouter);

export default router;
