import mongoose from "mongoose";

const rechargeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  number: {
    type: String,
    required: true,
  },

},
{
  timestamps: true,
});

export const Recharge = mongoose.model("recharge", rechargeSchema);
