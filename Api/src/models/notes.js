import { Schema, model } from "mongoose";

const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: String,
},{
    timestamps: true
});

const Note = model("Note", noteSchema);

export default Note;



