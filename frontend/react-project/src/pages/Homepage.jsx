// src/pages/Homepage.jsx
import { useEffect, useState } from "react";
import api from "../lib/axios";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";

const Homepage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (loading) return <p className="p-4">Loading notes...</p>;

  if (error) return <p className="p-4 text-error">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      {notes.length === 0 ? (
        <NotesNotFound />
      ) : (
     <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {notes.map((note) => (
    <NoteCard
      key={note._id}
      note={note}
      onDelete={(id) =>
        setNotes((prev) => prev.filter((n) => n._id !== id))
      }
    />
  ))}
</div>
      )}
    </div>
  );
};

export default Homepage;