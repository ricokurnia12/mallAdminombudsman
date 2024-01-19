import ServiceSchema from "@src/models/service.schema";
import { ServiceInterface } from "@src/interfaces/service.interface";

export const createService = async (data: ServiceInterface) => {
  const { name, agenciesId } = data;

  // Validate required fields
  if (!name || !agenciesId) {
    throw new Error("name and agenciesId are required");
  }

  // Check if the service with the same name already exists in the same agency
  const existingService = await ServiceSchema.findOne({ name, agenciesId });

  if (existingService) {
    throw new Error(
      "Service with the same name already exists in the same agency"
    );
  }

  // Create a new service
  const newService = new ServiceSchema({
    name,
    agenciesId,
  });

  // Save the new service to the database
  const savedService = await newService.save();
  return savedService;
};
