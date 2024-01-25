// Your controller file (e.g., serviceController.ts)

import { Request, Response } from "express";
import {
  createService,
  deleteService,
  getService,
} from "@src/services/service.service";

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
    const { data } = req.body;
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

export const getServiceByAgen =  async (req:Request, res:Response)=>{
  try {
    const {id} = req.params
   
  } catch (error) {
    
  }
}
