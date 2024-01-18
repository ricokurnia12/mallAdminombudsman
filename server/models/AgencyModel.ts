import mongoose from 'mongoose';

const agencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'id layanan tidak boleh kosong'],
  },
});

const AgencySchema = mongoose.model('Instansi', agencySchema);

export default AgencySchema
