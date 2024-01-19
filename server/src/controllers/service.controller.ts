// Your controller file (e.g., serviceController.ts)

import { Request, Response } from "express";
import { createService } from "@src/services/service.service";

export const addServices = async (req: Request, res: Response) => {
  try {
    const { name, agenciesId } = req.body;

    const savedService = await createService({ name, agenciesId });

    res.status(201).json(savedService);
  } catch (error) {
    console.error("Error adding service:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
