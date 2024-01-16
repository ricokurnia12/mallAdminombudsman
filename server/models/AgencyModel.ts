import mongoose from 'mongoose';

const agencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'id layanan tidak boleh kosong'],
  },
});

const Instansi = mongoose.model('Instansi', agencySchema);

module.exports = Instansi;
