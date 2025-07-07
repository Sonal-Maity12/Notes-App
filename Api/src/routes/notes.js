import { Router } from "express";
import { deleteNotes, getNotes, postNotes, updateNotes, getSingleNote } from "../controllers/notes.js";


const router = Router();

router.get("/", getNotes)

router.get("/:id", getSingleNote)

router.post("/", postNotes)

router.put("/:id", updateNotes)

router.delete("/:id",deleteNotes)





export default router;