import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://rushinit07:231807@cluster0.c49bnyn.mongodb.net/ReuseHub'
    );
    console.log("DB Connected");
  } catch (error) {
    console.error("DB connection error:", error);
  }
};


// add your mongoDB connection string above.
// Do not use '@' symbol in your databse user's password else it will show an error.