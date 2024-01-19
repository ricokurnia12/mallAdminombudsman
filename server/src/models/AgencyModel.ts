import mongoose from "mongoose";

const agencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "nama instansi tidak boleh kosong"],
  },
});

const AgencySchema = mongoose.model("Agency", agencySchema);

export default AgencySchema;
