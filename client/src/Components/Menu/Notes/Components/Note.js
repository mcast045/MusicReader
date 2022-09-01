import React from 'react';
import { useSelector } from 'react-redux'

const Note = ({
    label,
    note,
    onClick,
    entity,
    children,
}) => {

    const { isReplacing, isInserting, isUpdating } = useSelector(({ notes }) => notes)

    return (
        <div className='note-container'>
            <h3 className='note-label'>{label}</h3>
            <button disabled={isUpdating && !isReplacing && !isInserting} onClick={onClick}>
                <span id={note} className='note-menu-image'>{entity}{children}</span>
            </button>
        </div>
    );
}

export default Note;