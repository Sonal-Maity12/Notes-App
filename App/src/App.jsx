import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { HiPencilSquare } from "react-icons/hi2";
import { FaTrash } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import CreateEdit from "./components/CreateEdit";
import Delete from "./components/Delete";
import { api } from "./api";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [noteToDelete, setNoteToDelete] = useState(null);

  // Get Notes
  const getNotes = async () => {
    try {
      const { data } = await api.get("/api/notes");
      setNotes(data);
    } catch (err) {
      alert(err?.message || "Something went wrong!");
    }
  };

  const handleSaveNote = async () => {
    try {
      if (noteToEdit) {
        // EDIT
        await api.put(`/api/notes/${noteToEdit?._id}`, newNote);
        getNotes();
      } else {
        // CREATE
        await api.post("/api/notes", newNote);
        getNotes();
      }
      setNewNote({ title: "", content: "" });
      setModalOpen(false);
      setNoteToEdit(null);
    } catch (err) {
      alert(err?.message || "Something went wrong!");
    }
  };

  // Handle delete note
  const handleDeleteNote = async () => {
    // setNotes(notes.filter((note) => note.id !== noteToDelete.id));
    try {
      await api.delete(`/api/notes/${noteToDelete?._id}`);
      getNotes();
    } catch (err) {
      alert(err?.message || "Something went wrong!");
    }

    setDeleteModalOpen(false);
  };

  // Open edit modal
  const openEditModal = (note) => {
    setNoteToEdit(note);
    setNewNote({ title: note.title, content: note.content });
    setModalOpen(true);
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-indigo-600">Notes App</h1>
        <Button
          color="indigo"
          size="lg"
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2"
        >
          <IoMdAdd className="w-5 h-5" />
          Create Note
        </Button>
      </header>

      {/* Notes List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div key={note.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-xl">{note.title}</h3>
            <p className="text-gray-600">{note.content}</p>
            <div className="flex justify-end mt-4 space-x-2">
              <Button
                color="blue"
                size="sm"
                onClick={() => openEditModal(note)}
              >
                <HiPencilSquare className="w-5 h-5" />
              </Button>
              <Button
                color="red"
                size="sm"
                onClick={() => {
                  setNoteToDelete(note);
                  setDeleteModalOpen(true);
                }}
              >
                <FaTrash className="w-5 h-5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      <CreateEdit
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        newNote={newNote}
        setNewNote={setNewNote}
        setNoteToEdit={setNoteToEdit}
        noteToEdit={noteToEdit}
        handleSaveNote={handleSaveNote}
      />

      {/* Delete Confirmation Modal */}
      <Delete
        deleteModalOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
        handleDeleteNote={handleDeleteNote}
      />
    </div>
  );
};

export default App;
