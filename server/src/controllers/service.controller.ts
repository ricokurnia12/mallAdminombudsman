// Your controller file (e.g., serviceController.ts)

import { Request, Response } from "express";
import {
  createService,
  deleteService,
  getService,
} from "@src/services/service.service";

export const getAllService = () => {
  getService();
};

export const addServices = (req: Request, res: Response) => {
  const { name, agenciesId } = req.body;

  createService({ name, agenciesId }, res);
};

export const removeService = (req: Request, res: Response) => {
  const { id } = req.params; // Assuming you get the service ID from the request parameters

  deleteService(id, res);
};
