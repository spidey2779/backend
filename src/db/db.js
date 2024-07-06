import mongoose from "mongoose";

export const ConnectToDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI,{
    dbName:"myTodo"
  });
  console.log("Connected to MongoDB");
};
