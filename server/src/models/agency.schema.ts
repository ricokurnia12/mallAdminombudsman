import mongoose from "mongoose";

const agencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "nama instansi tidak boleh kosong"],
    unique: true, // Indeks unik
    lowercase: true, // Mengonversi nilai ke lowercase sebelum disimpan
  },
});

const AgencySchema = mongoose.model("Agency", agencySchema);

export default AgencySchema;
