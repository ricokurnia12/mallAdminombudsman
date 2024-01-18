import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  type: { type: String, required: [true, 'Masukan tipe pertanyaan'] },
  category: {
    type: String,
    required: [true, 'Masukan kategori'],
  },
  required: { type: Boolean, required: true },
  label: {
    type: String,
    required: [true, 'Masukan pertanyaan'],
  },
  options: [
    {
      label: { type: String },
      value: { type: mongoose.Schema.Types.Mixed },
    },
  ],
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: [true, 'id layanan tidak boleh kosong'],
  },
});

const QuestionSchema = mongoose.model('Question', questionSchema);

export default QuestionSchema
