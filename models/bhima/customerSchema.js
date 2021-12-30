import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  number: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  }
},
{
  timestamps: true,
});

export const Customers = mongoose.model("customer", customerSchema);
