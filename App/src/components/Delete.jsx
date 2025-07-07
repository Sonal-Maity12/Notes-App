import { Button } from '@material-tailwind/react'
import { Dialog } from '@material-tailwind/react'
import React from 'react'

const Delete = ({deleteModalOpen, setDeleteModalOpen, handleDeleteNote}) => {
  return (
    <Dialog open={deleteModalOpen} handler={() => setDeleteModalOpen(false)}>
        <div className="p-6 text-center">
          <h3 className="text-xl font-semibold">
            Are you sure you want to delete this note?
          </h3>
          <div className="mt-4 space-x-4">
            <Button color="gray" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button color="red" onClick={handleDeleteNote}>
              Delete
            </Button>
          </div>
        </div>
      </Dialog>
  )
}

export default Delete