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
  myUrls:[
    {
     shorten:{
       type: String
     },
     longUrl:{
       type: String
     },
    }
  ]
});

export const Users = mongoose.model("test2", userSchema);
