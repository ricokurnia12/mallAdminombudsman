import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'masukan nama layanan'],
  },
  agenciesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agency',
    required: [true, 'id instansi tidak boleh kosong'],
  },
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
