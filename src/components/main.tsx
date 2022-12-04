import { useState, useEffect } from 'react';
import { Note } from './Note';
import './main.scss';

export interface INote {
    id: number,
    content: string
}

export const Main = () => {
    const [notes, setNote] = useState<INote[]>([]);
    const [tags, setTag] = useState<string[]>([]);
    const [currentNote, setCurrentNote] = useState<string>("");
    const [filter, setFilter] = useState<string>("");

    const createNote = (event: any) => {
        if (event.key === "Enter") {
            setNote((prev) => {
                
                return [...prev, { id: Date.now(), content: currentNote }];
            });

            setCurrentNote("");
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, callback: (value: string) => void) => {
        callback(event.target.value);
    };

    const removeNote = (id: number) => {
        setNote(notes.filter((note: INote) => note.id !== id))
    }

    const handleSave = (id: number, updatedNote: string) => {
        notes.map((note:INote) => {
            if(note.id === id) {
                return {id, content: updatedNote};
            }
        })
    }
    
    useEffect(() => {
        let allTags: string[] = [];

        notes.forEach((note: INote) => {
            if (note.content.includes("#")) {
            const tags: any = note.content
                .split(" ")
                .filter((word: string) => word.includes("#"));
            allTags.push(...tags);
        }
        });
        // JSON
        console.log(JSON.stringify(notes));

        setTag([...new Set(allTags)]);
    }, [notes]);

  return (
    <div className='container'>
        <input 
            type='text'
            className='control'
            placeholder='Write note'
            value={currentNote}
            onChange={(e) => handleChange(e, setCurrentNote)}
            onKeyDown={createNote}
            />

        {/* TAGS GROUP */}
        <div className='tags_container'>
            <h2 className="title">Tag List</h2>
            <ul className="tags_list">
                {tags.map((tag: string, index) => (
                    <li key={index} className="tag" onClick={() => setFilter(tag)}>
                {tag}
                    </li>
                    ))}
            </ul>
        </div>

        {/* Notes group */}
        <div className='notes_conteiner'>
            <div className='notes_container_title'>
                <h2 className='title'>Notes list</h2>
                {filter && <button className="danger-button" onClick={() => setFilter("")}>
                    Clear filter
                </button>}
            </div>
            
            <ul className='note_list'>
                {
                    notes
                    .filter((note: INote) => note.content.includes(filter))
                        .map((note: INote) => (
                            <Note 
                                key={note.id}
                                note={note}
                                removeNote={() => {removeNote(note.id)}}
                                handleSave={handleSave}
                                />
                        ))
                }
            </ul>
        </div>
    </div>
  )
}
