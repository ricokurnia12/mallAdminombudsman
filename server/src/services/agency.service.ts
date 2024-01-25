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
export const addAgencyService = async (name: AgencyInterface) => {
  try {
    // Membuat objek baru berdasarkan model AgencySchema dengan menggunakan Mongoose
    const newAgency = new AgencySchema({ name });

    // Menyimpan objek baru ke MongoDB
    const savedAgency = await newAgency.save();

    // Mengembalikan objek yang baru saja disimpan
    return savedAgency;
  } catch (error) {
    // Log error jika terjadi kesalahan
    console.error("Error in addAgencyService:", error);
    // Jangan lupa untuk menangani atau melemparkan error sesuai kebutuhan
    // throw error;
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

export const editAgencyService = async (id: string, name: string) => {
  try {
    const updatedAgency = await AgencySchema.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!updatedAgency) {
      return "Instansi tidak ditemukan";
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

    // Jika data instansi tidak ditemukan, kembalikan null
    return deletedAgency;
  } catch (error) {
    console.error("Error in deleteAgencyService:", error);
    throw error; // Melempar error agar dapat ditangkap di controller
  }
};
