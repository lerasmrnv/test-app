import React, { useState } from 'react'
import { INote } from './main';
import './main.scss';

interface NoteProps {
    note : INote,
    removeNote : () => void, 
    handleSave : (id: number, updatedNote: string) => void,
}

export const Note = ({note, removeNote, handleSave}:NoteProps) => {
    const [isEdit, setIsEdit]=useState<Boolean>(false);
    const [currentValue, setCurrentValue]=useState<string>(note.content);

    const handleEdit = () => {
        setIsEdit((prev) => !prev)
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setCurrentValue(e.target.value);
    }

    const handleCancel = () => {
        setCurrentValue(note.content);
        handleEdit();
    }

  return (
    <li key={note.id} className='note_list_item'>
        {!isEdit ? (
            <div className="note_list_item_content">{currentValue}</div>
        ) : (
            <input 
                type='text'
                value={currentValue}
                onChange = {handleChange}
                />
        )}
        
        <div className="note_list_item_control">
            {!isEdit ? (
                <>
                <button className='control-edit' onClick={handleEdit}>Edit</button>
                <button className='control-delete' onClick={removeNote}>Delete</button>
                </>
            ) : (
                <>
                <button className='control-save' onClick={() => {handleSave(note.id, currentValue); handleEdit() }}>Save</button>
                <button className='control-cancel' onClick={handleCancel}>Cancel</button>
                </>
            )}
        </div>
    </li>
  )
}
