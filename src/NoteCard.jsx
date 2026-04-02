import React from "react";

const NoteCard=({note,onDelete,onEdit})=>{
    return(
        <div className="note-card">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <div className="buttons"></div>
            <button className="save" onClick={()=>onEdit(note)}>Edit</button>
            <button className="delete"onClick={()=>onDelete(note._id)}>Delete</button>
        </div>
    );

};
export default NoteCard;
