import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
  resetToken: {
    type: String,
  },
  sessionExpiry: {
    type: Date,
  },

}, 
{
  timestamps: true,
});

export const Users = mongoose.model("user", userSchema);