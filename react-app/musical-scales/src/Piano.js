import React from 'react';
import Key from './Key';

const Piano = ({ keys, currentLesson, userProgress, updateProgress}) => {
    const playNote = (frequency) => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        if(audioContext.state === 'suspended') {
            audioContext.resume();
        }

        const oscillator = audioContext.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.connect(audioContext.destination);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.4);
    }

    const highlightNextNote = () => {
        const lessonProgress = userProgress[currentLesson.name];
        if(lessonProgress && !lessonProgress.completed) {
            const noteIndex = lessonProgress.currentNoteIndex;
            const note = currentLesson.notes[noteIndex];
            return note;
        }
        return null;
    }

    const noteToHighlight = currentLesson ? highlightNextNote() : null;

    return (
        <div id="piano">
            {keys.map(key => (
                <Key 
                    key={key.note}
                    note={key.note}
                    type={key.type}
                    frequency={key.frequency}
                    playNote={playNote}
                    highlight={noteToHighlight === key.note}
                    updateProgress={updateProgress}
                    currentLesson={currentLesson}
                    userProgress={userProgress}
                />
            ))}
        </div>
    )
}

export default Piano;
