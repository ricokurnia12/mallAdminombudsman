// Your controller file (e.g., serviceController.ts)

import { Request, Response } from "express";
import {
  createService,
  deleteService,
  getService,
  getServicesid,
  getAgencyService,
} from "@src/services/service.service";
import { ObjectId } from "mongodb";

export const getAllService = async (req: Request, res: Response) => {
  try {
    const services = await getService();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createServiceController = async (req: Request, res: Response) => {
  try {
    const { name, agenciesId } = req.body;
    if (!ObjectId.isValid(agenciesId)) {
      return res.status(400).json({ message: "ID not valid" });
    }
    const data = { name, agenciesId };

    const result = await createService(data);

    if ("error" in result) {
      res.status(400).json({ message: result.error });
    } else {
      res.status(201).json(result);
    }
  } catch (error) {
    console.error("Error in createServiceController:", error);
    res.status(500).json({ message: "Failed to create service" });
  }
};

export const removeService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedService = await deleteService(id);
    if (!deletedService) {
      res.status(404).json({ message: "Id service not found" });
    } else {
      res.status(200).json(deletedService);
    }
  } catch (error) {
    console.error("Error removing service:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getServiceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Agency ID is required" });
    }
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID not valid" });
    }

    const services = await getServicesid(id);

    if ("error" in services) {
      return res.status(404).json({ message: services.error });
    }

    res.status(200).json(services);
  } catch (error) {
    console.error("Error getting services by agency ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAgencyServiceController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    // const agencyId = new ObjectId(id); // Convert id to ObjectId
    if (!id) {
      return res.status(400).json({ message: "Agency ID is required" });
    }
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID not valid" });
    }
    // Pass agencyId as an argument to getAgencyService
    const services = await getAgencyService(id);

    res.status(200).json(services);
  } catch (error) {
    console.error("Error in getAgencyServiceController:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
