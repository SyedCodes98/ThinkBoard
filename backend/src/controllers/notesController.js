import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find()//.sort({createdAt:-1});//newest first
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function getNoteById(req,res) {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({message:"Note not found"});
        
        }
res.status(201).json(note);
    } catch (error) {
        console.error("Error in controller",error);
        res.status(500).json({message:"SERVER ERROR"})
    }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
  const savedNNote = await newNote.save();
    res.status(201).json(savedNNote);
  } catch (error) {
    console.error("Error in createNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req, res) {
 try {
   const {title,content} = req.body
 const updatedNote =  await Note.findByIdAndUpdate(req.params.id,{title,content},{
    new :true
 });
 if (!updatedNote) {
    return res.status(404).json({message:"Note not found"})
 }
  res.status(200).json(updatedNote);
 } catch (error) {
    console.error("Error in createNote controller",error);
    res.status(500).json({message:"Internal server error"});
    
 }
}

export async function delNote(req, res) {
 try {
     
     const delNote = await Note.findByIdAndDelete(req.params.id)
   if (!delNote) {
      return res.status(404).json({message:"NO note found"});
   }
    res.status(200).json({ message: "Note deleted successfully" });
 } catch (error) {
    res.status(500).json("SERVER ERROR ");
 }
}
