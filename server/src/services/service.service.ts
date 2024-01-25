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

export const createService = async (data: ServiceInterface) => {
  try {
    const { name, agenciesId } = data;

    // Validasi jika service dengan nama yang sama sudah ada di agency yang sama
    const existingService = await ServiceSchema.findOne({ name, agenciesId });

    if (existingService) {
      return {
        error: "Service with the same name already exists in the same agency",
      };
    }

    // Buat dan simpan service baru
    const newService = new ServiceSchema({ name, agenciesId });
    const savedService = await newService.save();
    return savedService.toObject();
  } catch (error) {
    console.error("Error in createService:", error);
    throw error;
  }
};

export const deleteService = async (id: string) => {
  try {
    if (!id) {
      throw new Error("Id service is required!");
    }

    const deletedService = await ServiceSchema.findByIdAndDelete(id);
    return deletedService;
  } catch (error) {
    console.error("Error deleting service:", error);
    throw new Error("Internal Server Error");
  }
};

export const getServiceByAgenSer = async (id: string) => {
  try {
    
  } catch (error) {}
};
