import mongoose from "mongoose";

export const ConnectionToDatabase = async () => {
  await mongoose.connect(process.env.MONGO_URI, {dbName: process.env.DB_NAME})
  .then(() => { console.log(`Database connected`) })
  .catch((e) => { console.log(`Error connecting database ${e}`) });
}