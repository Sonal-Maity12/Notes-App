import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.fgqyz.mongodb.net/notes',{
            useNewUrlParser: true,
        })
        console.log("DB connected!")
    } catch (error) {
        console.log(error.message)
    }
}