import React, { useState } from 'react';
import Piano from './Piano';
import Lesson from './Lesson';
import Progress from './Progress';
import Modal from './Modal';
import './App.css';

function App() {
  const [currentLesson, setCurrentLesson] = useState(null);
  const [userProgress, setUserProgress] = useState({});
  const [showModal, setShowModal] = useState(false);

  const keys = [
    { note: 'C4', type: 'white', frequency: 261.63 }, { note: 'C#4', type: 'black', frequency: 277.18 },
    { note: 'D4', type: 'white', frequency: 293.66 }, { note: 'D#4', type: 'black', frequency: 311.13 },
    { note: 'E4', type: 'white', frequency: 329.63 }, { note: 'F4', type: 'white', frequency: 349.23 },
    { note: 'F#4', type: 'black', frequency: 369.99 }, { note: 'G4', type: 'white', frequency: 392.00 },
    { note: 'G#4', type: 'black', frequency: 415.30 }, { note: 'A4', type: 'white', frequency: 440.00 },
    { note: 'A#4', type: 'black', frequency: 466.16 }, { note: 'B4', type: 'white', frequency: 493.88 },
    { note: 'C5', type: 'white', frequency: 523.25 }, { note: 'C#5', type: 'black', frequency: 554.37 },
    { note: 'D5', type: 'white', frequency: 587.33 }, { note: 'D#5', type: 'black', frequency: 622.25 },
    { note: 'E5', type: 'white', frequency: 659.25 }, { note: 'F5', type: 'white', frequency: 698.46 },
    { note: 'F#5', type: 'black', frequency: 739.99 }, { note: 'G5', type: 'white', frequency: 783.99 },
    { note: 'G#5', type: 'black', frequency: 830.61 }, { note: 'A5', type: 'white', frequency: 880.00 },
    { note: 'A#5', type: 'black', frequency: 932.33 }, { note: 'B5', type: 'white', frequency: 987.77 }
  ];

  const lessons = [
    { name: 'Lesson 1: C Major Scale', notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5']},
    { name: 'Lesson 2: D Major Scale', notes: ['D4', 'E4', 'F#4', 'G4', 'A4', 'B4', 'C#5', 'D5']},
    { name: 'Lesson 3: E Major Scale', notes: ['E4', 'F#4', 'G#4', 'A4', 'B4', 'C#5', 'D#5', 'E5']},
    { name: 'Lesson 4: F Major Scale', notes: ['F4', 'G4', 'A4', 'A#4', 'C5', 'D5', 'E5', 'F5']},
    { name: 'Lesson 5: G Major Scale', notes: ['G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F#5', 'G5']},
    { name: 'Lesson 6: A Major Scale', notes: ['A4', 'B4', 'C#5', 'D5', 'E5', 'F#5', 'G#5', 'A5']},
    { name: 'Lesson 7: B Major Scale', notes: ['B4', 'C#5', 'D#5', 'E5', 'F#5', 'G#5', 'A#5', 'B5']},
    // { name: 'Lesson 8: C# | Db Major Scale', notes: ['G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F#5', 'G5']},
    // { name: 'Lesson 9: D# | Eb Major Scale', notes: ['G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F#5', 'G5']},
    // { name: 'Lesson 10: F# | Gb Major Scale', notes: ['G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F#5', 'G5']},
    // { name: 'Lesson 11: G# | Ab Major Scale', notes: ['G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F#5', 'G5']},
    // { name: 'Lesson 12: A# | Bb Major Scale', notes: ['G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F#5', 'G5']},
  ];

  const startLesson = (lesson) => {
    setCurrentLesson(lesson);
    setUserProgress((prevProgress) => ({
      ...prevProgress,
      [lesson.name]: { completed: false, currentNoteIndex: 0}
    }));
    setShowModal(false);
  };

  const updateProgress = (lessonName, noteIndex) => {
    setUserProgress((prevProgress) => {
      const newProgress = { ...prevProgress };
      newProgress[lessonName].currentNoteIndex = noteIndex;
      newProgress[lessonName].completed = noteIndex >= lessons.find(lesson => lesson.name === lessonName).notes.length;
      return newProgress;
    });
    if(userProgress[lessonName].completed){
      setShowModal(true);
    }
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="App">
      <h1>Musical Scales on Piano</h1>
      <Piano keys={keys} currentLesson={currentLesson} userProgress={userProgress} updateProgress={updateProgress} />
      <Lesson lessons={lessons} startLesson={startLesson} />
      <Progress userProgress={userProgress}/>
      {showModal && <Modal lessonName={currentLesson.name} closeModal={closeModal} />}
    </div>
  );
}

export default App;
