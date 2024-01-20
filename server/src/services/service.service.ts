import ServiceSchema from "@src/models/service.schema";
import { ServiceInterface } from "@src/interfaces/service.interface";
import { Response, Request } from "express";
import mongoose from "mongoose";

export const getService = async () => {
  try {
    const allService = await ServiceSchema.find();
    return allService;
  } catch (error) {
    console.error("Error getting service:", error);
  }
};

export const createService = async (data: ServiceInterface, res: Response) => {
  try {
    const { name, agenciesId } = data;

    // Validate required fields
    if (!name || !agenciesId) {
      return res
        .status(400)
        .json({ message: "name and agenciesId are required" });
    }

    // Validate if agenciesId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(agenciesId)) {
      return res.status(400).json({ message: "Invalid agenciesId format" });
    }

    // Check if the service with the same name already exists in the same agency
    const existingService = await ServiceSchema.findOne({ name, agenciesId });

    if (existingService) {
      return res.status(400).json({
        message: "Service with the same name already exists in the same agency",
      });
    }

    // Create a new service
    const newService = new ServiceSchema({
      name,
      agenciesId,
    });

    // Save the new service to the database
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    console.error("Error creating service:", error);

    // Send an internal server error response to the client
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteService = async (id: string, res: Response) => {
  try {
    if (!id) {
      throw new Error("Id service is required!");
    }

    const deletedService = await ServiceSchema.findByIdAndDelete(id);
    if (!deletedService) {
      return res.status(404).json({ message: "id service not found" });
    }

    res.status(200).json(deletedService);
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
