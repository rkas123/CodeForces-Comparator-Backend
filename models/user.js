import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  codechef: { type: String, default: "" },
  codeforces: { type: String, default: "" },
});

export default mongoose.model("User", userSchema);
