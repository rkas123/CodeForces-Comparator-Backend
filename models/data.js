import mongoose from "mongoose";

const dataSchema = mongoose.Schema({
  id: { type: Number, required: true },
  date: { type: Number, required: true },
  data: { type: Object },
});

export default mongoose.model("User", dataSchema);
