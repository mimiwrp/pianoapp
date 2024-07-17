document.addEventListener('DOMContentLoaded', () => {
    const piano = document.getElementById('piano');
    const keys = [
        { note: 'C4', type: 'white'},
        { note: 'C#4', type: 'black'},
        { note: 'D4', type: 'white'},
        { note: 'D#4', type: 'black'},
        { note: 'E4', type: 'white'},
        { note: 'F4', type: 'white'},
        { note: 'F#4', type: 'black'},
        { note: 'G4', type: 'white'},
        { note: 'G#4', type: 'black'},
        { note: 'A4', type: 'white'},
        { note: 'A#4', type: 'black'},
        { note: 'B4', type: 'white'},
    ];

    keys.forEach(key => {
        const keyElement = document.createElement('div');
        keyElement.className = `key ${key.type}`;
        keyElement.textContent = key.note;
        keyElement.addEventListener('click', () => playNote(key.note));
        piano.appendChild(keyElement);
    });

    function playNote(note) {
        const encodedNote = encodeURIComponent(note);
        const audio = new Audio(`sounds/${encodedNote}.mp3`);
        audio.play();
    }
})

