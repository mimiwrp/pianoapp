import React from 'react';
const Key = ({ note, type, frequency, playNote, highlight, updateProgress, currentLesson, userProgress }) => {
    const handleClick = () => {
        playNote(frequency);

        if(currentLesson && userProgress[currentLesson.name]) {
            const progress = userProgress[currentLesson.name];
            if(currentLesson.notes[progress.currentNoteIndex] === note){
                const newNoteIndex = progress.currentNoteIndex + 1;
                // const completed = newNoteIndex >= currentLesson.notes.length;
                updateProgress(currentLesson.name, newNoteIndex);

                // if(completed) {
                //     showModal(true);
                // }
            }
        }
    };
    return (
        <div className={`key ${type} ${highlight ? 'highlight' : ''}`} onClick={handleClick}>
            {note}
        </div>
    )
}

export default Key;