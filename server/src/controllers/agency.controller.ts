import { DeletedAgencyOrError } from "@src/interfaces/agency.interface";
import AgencySchema from "@src/models/agency.schema";
import {
  addAgencyService,
  deleteAgencyService,
  editAgencyService,
  getAgencyByIdService,
  getAgencyService,
} from "@src/services/agency.service";
import { ObjectId } from "mongodb";

import { Request, Response, response } from "express";

type DeletedAgencyOrErrorOrNull = DeletedAgencyOrError | null;

// Controller untuk menambahkan data instansi

export const addAgency = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const result = await addAgencyService(name);

    if (result.error) {
      return res.status(400).json({ message: result.error });
    }

    res.status(201).json(result);
  } catch (error) {
    console.error("Error in addAgency:", error);
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
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID not valid" });
    }
    const agencies = await getAgencyByIdService(id);
    if (!agencies) {
      return res.status(404).json({ message: "id not found" });
    }
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
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID not valid" });
    }

    const objectId = new ObjectId(id);
    const updatedAgency = await editAgencyService(objectId, name); // Memberikan tanggapan berdasarkan hasil editAgencyService

    if (updatedAgency === null) {
      // Jika hasil adalah null, berarti ID tidak valid
      res.status(404).json({ message: "Instansi tidak ditemukan" });
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
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID not valid" });
    }
    const removeddAgency: DeletedAgencyOrErrorOrNull =
      (await deleteAgencyService(id)) as DeletedAgencyOrError;

    if (removeddAgency === null) {
      // Jika hasil adalah null, berarti ID tidak valid
      res.status(404).json({ message: "Instansi tidak ditemukan" });
    } else {
      // Jika berhasil diupdate, kembalikan objek yang diupdate
      res.status(200).json(removeddAgency);
    }
  } catch (error) {
    console.error("Error in deleteAgency:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
