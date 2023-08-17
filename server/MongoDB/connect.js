import mongoose from "mongoose";

const connectDB = (url) => {
    console.log(url)
    mongoose.set('strictQuery',true);

    mongoose.connect(url)
        .then(() => console.log("Connected to MongoDB"))
        .catch((error) => console.log(error.message));
}

export default connectDB;