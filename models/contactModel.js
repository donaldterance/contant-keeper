import mongoose from 'mongoose';
const ContactSchema = mongoose.Schema({
  //relation between contact and user
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: Number },
  type: { type: String, default: 'personal' },
  date: { type: Date, required: true, default: Date.now() },
});

export default mongoose.model('contact', ContactSchema);
