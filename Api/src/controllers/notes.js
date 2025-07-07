import Notes from "../models/notes.js"

export const getNotes = async (req, res)=> {
    try {
        let response = await Notes.find()
        res.send(response)
    } catch (err) {
        res.send(err.message)
    }
}

export const getSingleNote = async (req, res)=> {
    try {
        const {id} = req.params;
        let response = await Notes.findById(id)
        res.send(response)
    } catch (err) {
        res.send(err.message)
    }
}

export const postNotes = async (req, res)=> {
    try {
        const {title, content} = req.body;
        let response = await Notes.create({title, content})
        res.status(201).send(response)
    } catch (err) {
        res.send(err.message)
    }
}

export const updateNotes = async (req, res)=> {
    try {
        const {id}= req.params;
        const data = req.body;
        let response = await Notes.findByIdAndUpdate(id,data,{
            new: true
        })
        res.send(response)
    } catch (err) {
        res.send(err.message)
    }
}

export const deleteNotes= async (req, res)=> {
    try {
        const {id}= req.params;
        let response = await Notes.findByIdAndDelete(id)
        res.send(response)
    } catch (err) {
        res.send(err.message)
    }
}
