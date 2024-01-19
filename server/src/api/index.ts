import express from "express";

import AgencyRouter from "@src/Routes/agency.route";
const router = express.Router();

router.use("/agency", AgencyRouter);

export default router;
