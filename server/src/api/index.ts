import express from "express";

import AgencyRouter from "../Routes/agency.route";
const router = express.Router();

router.use("/agency", AgencyRouter);

export default router;
