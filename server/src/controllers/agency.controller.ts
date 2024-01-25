import AgencySchema from "@src/models/agency.schema";
import {
  addAgencyService,
  deleteAgencyService,
  editAgencyService,
  getAgencyByIdService,
  getAgencyService,
} from "@src/services/agency.service";

import { Request, Response, response } from "express";

// Controller untuk menambahkan data instansi
export const addAgency = async (req: Request, res: Response) => {
  try {
    // mengambil nama dari client
    const { name } = req.body;
    // update data menggunakan service
    const savedAgency = await addAgencyService(name);
    // respon ke client hasilnya
    res.status(201).json(savedAgency);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller untuk mengambil semua data instansi
export const getAllAgencies = async (req: Request, res: Response) => {
  try {
    const agencies = await getAgencyService();
    res.status(200).json(agencies);
  } catch (error) {
    console.error("Error in getAllAgencies:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// Controller untuk mengambil data instansi berdasarkan ID
export const getAgencyById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const agencies = await getAgencyByIdService(id);
    res.status(201).json(agencies);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller untuk mengedit data instansi berdasarkan ID
export const editAgency = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedAgency = await editAgencyService(id, name);

    // Memberikan tanggapan berdasarkan hasil editAgencyService
    if (typeof updatedAgency === "string") {
      // Jika hasil adalah string, berarti ada pesan kesalahan
      res.status(404).json({ message: updatedAgency });
    } else {
      // Jika berhasil diupdate, kembalikan objek yang diupdate
      res.status(200).json(updatedAgency);
    }
  } catch (error) {
    console.error("Error in editAgency:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller untuk menghapus data instansi berdasarkan ID
export const deleteAgency = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedAgency = await deleteAgencyService(id);

    if (!deletedAgency) {
      return res.status(404).json({ message: "Instansi tidak ditemukan" });
    }

    res.status(200).json(deletedAgency);
  } catch (error) {
    console.error("Error in deleteAgency:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
