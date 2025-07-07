import { Textarea } from '@material-tailwind/react';
import { Input } from '@material-tailwind/react';
import { Button } from '@material-tailwind/react';
import { Dialog } from '@material-tailwind/react';
import React from 'react'

const CreateEdit = ({modalOpen, setModalOpen, newNote, setNewNote, setNoteToEdit, noteToEdit, handleSaveNote}) => {
  return (
    <Dialog open={modalOpen} handler={() => setModalOpen(false)}>
        <div className="p-6 space-y-4">
          <h3 className="text-xl font-semibold text-center">
            {noteToEdit ? "Edit Note" : "Create New Note"}
          </h3>
          <Input
            label="Title"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          />
          <Textarea
            label="Content"
            value={newNote.content}
            onChange={(e) =>
              setNewNote({ ...newNote, content: e.target.value })
            }
          />
          <div className="flex justify-end space-x-4">
            <Button
              color="gray"
              onClick={() => {
                setModalOpen(false);
                setNoteToEdit(null);
              }}
            >
              Cancel
            </Button>
            <Button color="indigo" onClick={handleSaveNote}>
              {noteToEdit ? "Save" : "Create"}
            </Button>
          </div>
        </div>
      </Dialog>
  )
}

export default CreateEdit