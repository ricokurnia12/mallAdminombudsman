import AgencySchema from "../models/AgencyModel";

import { Request, Response } from "express";

// Controller untuk menambahkan data instansi
export const addAgency = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const newAgency = new AgencySchema({ name });
    const savedAgency = await newAgency.save();

    res.status(201).json(savedAgency);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller untuk mengambil semua data instansi
export const getAllAgencies = async (req: Request, res: Response) => {
  try {
    const agencies = await AgencySchema.find();
    res.status(200).json(agencies);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller untuk mengambil data instansi berdasarkan ID
export const getAgencyById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const agency = await AgencySchema.findById(id);
    if (!agency) {
      return res.status(404).json({ message: "Instansi tidak ditemukan" });
    }
    res.status(200).json(agency);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller untuk mengedit data instansi berdasarkan ID
export const editAgency = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedAgency = await AgencySchema.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updatedAgency) {
      return res.status(404).json({ message: "Instansi tidak ditemukan" });
    }

    res.status(200).json(updatedAgency);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller untuk menghapus data instansi berdasarkan ID
export const deleteAgency = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedAgency = await AgencySchema.findByIdAndDelete(id);

    if (!deletedAgency) {
      return res.status(404).json({ message: "Instansi tidak ditemukan" });
    }

    res.status(200).json(deletedAgency);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
