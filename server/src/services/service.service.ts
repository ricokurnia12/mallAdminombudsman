import ServiceSchema from "@src/models/service.schema";
import { ServiceInterface } from "@src/interfaces/service.interface";

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
    console.log(data);

    // Konversi nama ke huruf kecil
    const lowercaseName = name.toLowerCase();

    // Validasi jika service dengan nama yang sama sudah ada di agency yang sama
    const existingService = await ServiceSchema.findOne({
      name: lowercaseName,
      agenciesId,
    });

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

export const getServicesid = async (agencyId: string) => {
  try {
    if (!agencyId) {
      throw new Error("Agency ID is required!");
    }

    const services = await ServiceSchema.findById(agencyId);
    if (!services) {
      return {
        error: "id service not found",
      };
    }
    return services;
  } catch (error) {
    console.error("Error getting services by agency ID:", error);
    throw new Error("Internal Server Error");
  }
};
