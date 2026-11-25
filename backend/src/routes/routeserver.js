import express from "express";
const router = express.Router();
import {
  createNote,
  getAllNotes,
  updateNote,
  getNoteById,
  delNote,
} from "../controllers/notesController.js";


router.get("/", getAllNotes);
router.get("/:id", getNoteById);

router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", delNote);

export default router;
