// Import model dan interface yang diperlukan
import AgencySchema from "@src/models/agency.schema";
import { AgencyInterface } from "@src/interfaces/agency.interface";
import { ObjectId } from "mongodb";
// Service untuk mendapatkan semua data instansi
export const getAgencyService = async () => {
  try {
    // Menggunakan Mongoose untuk mendapatkan semua data instansi dari MongoDB
    const agencies = await AgencySchema.find();
    return agencies;
  } catch (error) {
    // Log dan lempar error jika terjadi kesalahan
    console.error("Error in getAgencyService:", error);
    throw error;
  }
};

// Service untuk menambahkan data instansi baru

export const addAgencyService = async (name: string) => {
  try {
    const existingAgency = await AgencySchema.findOne({ name });
    if (existingAgency) {
      return { error: "Agency with this name already exists" } as const;
    }

    const newAgency = new AgencySchema({ name });
    const savedAgency = await newAgency.save();
    return { agency: savedAgency };
  } catch (error) {
    console.error("Error in addAgencyService:", error);
    throw error;
  }
};

// service untuk gmendapatkan instansi berdasarkan id
export const getAgencyByIdService = async (id: string) => {
  try {
    // Konversi string ID ke tipe ObjectId dari MongoDB
    const objectId = new ObjectId(id);

    // Menggunakan Mongoose untuk mendapatkan data instansi berdasarkan ID
    const agency = await AgencySchema.findById(objectId);

    return agency;
  } catch (error) {
    console.error("Error in getAgencyByIdService:", error);
    throw error;
  }
};

export const editAgencyService = async (id: ObjectId, name: string) => {
  try {
    const updatedAgency = await AgencySchema.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updatedAgency) {
      return null;
    }

    return updatedAgency;
  } catch (error) {
    console.error("Error in editAgencyService:", error);
  }
};

// Service untuk menghapus data instansi berdasarkan ID
export const deleteAgencyService = async (id: string) => {
  try {
    // Menggunakan Mongoose untuk mencari dan menghapus data instansi berdasarkan ID
    const deletedAgency = await AgencySchema.findByIdAndDelete(id);
    if (!deleteAgencyService) {
      return null;
    }

    // Jika data instansi tidak ditemukan, kembalikan null
    return deletedAgency;
  } catch (error) {
    console.error("Error in deleteAgencyService:", error);
    throw error; // Melempar error agar dapat ditangkap di controller
  }
};
