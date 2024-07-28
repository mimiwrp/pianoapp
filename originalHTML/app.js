// import * as THREE from './node_modules/three/build/three.module.js';
//for 2D no Three.js 
document.addEventListener('DOMContentLoaded', () => {
    const piano = document.getElementById('piano');
    const lessonList = document.getElementById('lesson-list');
    const progressDetails = document.getElementById('progress-details');

    const keys = [
        { note: 'C4', type: 'white', frequency: 261.63 },
        { note: 'C#4', type: 'black', frequency: 277.18 },
        { note: 'D4', type: 'white', frequency: 293.66 },
        { note: 'D#4', type: 'black', frequency: 311.13 },
        { note: 'E4', type: 'white', frequency: 329.63 },
        { note: 'F4', type: 'white', frequency: 349.23 },
        { note: 'F#4', type: 'black', frequency: 369.99 },
        { note: 'G4', type: 'white', frequency: 392.00 },
        { note: 'G#4', type: 'black', frequency: 415.30 },
        { note: 'A4', type: 'white', frequency: 440.00 },
        { note: 'A#4', type: 'black', frequency: 466.16 },
        { note: 'B4', type: 'white', frequency: 493.88 },
        { note: 'C5', type: 'white', frequency: 523.25 },
        { note: 'C#5', type: 'black', frequency: 554.37 },
        { note: 'D5', type: 'white', frequency: 587.33 },
        { note: 'D#5', type: 'black', frequency: 622.25 },
        { note: 'E5', type: 'white', frequency: 659.25 },
        { note: 'F5', type: 'white', frequency: 698.46 },
        { note: 'F#5', type: 'black', frequency: 739.99 },
        { note: 'G5', type: 'white', frequency: 783.99 },
        { note: 'G#5', type: 'black', frequency: 830.61 },
        { note: 'A5', type: 'white', frequency: 880.00 },
        { note: 'A#5', type: 'black', frequency: 932.33 },
        { note: 'B5', type: 'white', frequency: 987.77 }
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

    let currentLesson = null;
    let userProgress = {};
    let audioContext = null;

    keys.forEach(key => {
        const keyElement = document.createElement('div');
        keyElement.className = `key ${key.type}`;
        keyElement.textContent = key.note;
        keyElement.dataset.note = key.note;
        keyElement.dataset.frequency = key.frequency;
        keyElement.addEventListener('click', () => playNote(key.frequency));
        piano.appendChild(keyElement);
    });

    lessons.forEach(lesson => {
        const lessonItem = document.createElement('div');
        lessonItem.className = 'lesson-item';
        lessonItem.textContent = lesson.name;
        lessonItem.addEventListener('click', () => startLesson(lesson));
        lessonList.appendChild(lessonItem);
    })

    function initializeAudioContext() {
        if(!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            //ensure that the audio context is resumed if it is in a suspended state.
            if(audioContext.state === 'suspend'){
                audioContext.resume();
            }
        }
    }

    function playNote(frequency) {
        initializeAudioContext();

        const oscillator = audioContext.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.connect(audioContext.destination);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.4); //play the note for 1 second
    }

    function startLesson(lesson) {
        currentLesson = lesson;
        userProgress[lesson.name] = { completed: false, currentNoteIndex: 0};
        highlightNextNote();
    }

    function highlightNextNote() {
        if(currentLesson && !userProgress[currentLesson.name].completed) {
            //clear bg color of all keys
            // const allKeys = document.querySelectorAll('.key');
            // allKeys.forEach(key => key.style.backgroundColor = '');

            const noteIndex = userProgress[currentLesson.name].currentNoteIndex;

            const note = currentLesson.notes[noteIndex];
            const keyElement = document.querySelector(`.key[data-note="${note}"]`);
            if(keyElement) {
                //remove any existing event listener
                keyElement.replaceWith(keyElement.cloneNode(true));
                const newKeyElement = document.querySelector(`.key[data-note="${note}"]`);

                newKeyElement.style.backgroundColor = 'yellow';
                newKeyElement.addEventListener('click', () => {
                    const frequency = parseFloat(newKeyElement.dataset.frequency);

                    playNote(frequency);
                    // newKeyElement.style.backgroundColor = '';
                    userProgress[currentLesson.name].currentNoteIndex++;
                    if(userProgress[currentLesson.name].currentNoteIndex >= currentLesson.notes.length) {
                        userProgress[currentLesson.name].completed = true;
                        showCongratulations(currentLesson.name);
                        updateProgress();
                    }else {
                        highlightNextNote();
                    }
                });
            }
        }
    }

    function showCongratulations(lessonName) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <p>Congratulations! You have completed ${lessonName}. Great job!</p>
            </div>
        `;
        document.body.appendChild(modal);

        const closeButton = modal.querySelector('.close-button');
        closeButton.addEventListener('click', () => {
            document.body.removeChild(modal);
        })
    }

    function updateProgress() {
        //clear bg color of all keys
        const allKeys = document.querySelectorAll('.key');
        allKeys.forEach(key => key.style.backgroundColor = '');

        progressDetails.innerHTML = '';
        for(const lessonName in userProgress){
            const progressItem = document.createElement('div');
            progressItem.className = 'progress-item';
            const status = userProgress[lessonName].completed ? 'Completed' : 'In Progress';
            progressItem.textContent = `${lessonName}: ${status}`;
            progressDetails.appendChild(progressItem);
        }
    }

    //add a user interaction prompt to initialize the audio context
    document.body.addEventListener('click', initializeAudioContext, { once: true});
})


//with Three.js
// document.addEventListener('DOMContentLoaded', () => {
//     const container = document.getElementById('piano-container');

//     //set up three.js scene
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(container.clientWidth, container.clientHeight);
//     container.appendChild(renderer.domElement);

//     //add ambient light
//     const ambientLight = new THREE.AmbientLight(0xffffff, 1);
//     scene.add(ambientLight);
//     //add directional light
//     const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
//     directionalLight.position.set(1, 1, 1);
//     scene.add(directionalLight);

//     const keys = [
//         { note: 'C4', type: 'white'},
//         { note: 'C#4', type: 'black'},
//         { note: 'D4', type: 'white'},
//         { note: 'D#4', type: 'black'},
//         { note: 'E4', type: 'white'},
//         { note: 'F4', type: 'white'},
//         { note: 'F#4', type: 'black'},
//         { note: 'G4', type: 'white'},
//         { note: 'G#4', type: 'black'},
//         { note: 'A4', type: 'white'},
//         { note: 'A#4', type: 'black'},
//         { note: 'B4', type: 'white'},
//     ];

//     const keyWidth = 1;
//     const keyHeight = 5;
//     const keyDepth = 0.2;

//     let xOffset = 0;

//     keys.forEach(key => {
//         const geometry = new THREE.BoxGeometry(keyWidth, keyHeight, keyDepth);
//         const material = new THREE.MeshStandardMaterial({ color: key.type === 'white' ? 0xffffff : 0x000000});
//         const keyMesh = new THREE.Mesh(geometry, material);
//         keyMesh.position.x = xOffset;
//         keyMesh.userData = { note: key.note };
//         scene.add(keyMesh);

//         xOffset += keyWidth;

//         //position the camera
//         camera.position.z = 10;

//         //handle window resize
//         window.addEventListener('resize', () => {
//             camera.aspect = container.clientWidth / container.clientHeight;
//             camera.updateProjectionMatrix();
//             renderer.setSize(container.clientWidth, container.clientHeight);
//         });

//         //animation loop
//         const animate = () => {
//             requestAnimationFrame(animate);
//             renderer.render(scene, camera);
//         };

//         animate();

//         //handle mouse click to play notes
//         const raycaster = new THREE.Raycaster();
//         const mouse = new THREE.Vector2();

//         const onMouseClick = (event) => {
//             event.preventDefault();

//             mouse.x = (event.clientX / container.clientWidth) * 2 - 1;
//             mouse.y = -(event.clientY / container.clientHeight) * 2 + 1;

//             raycaster.setFromCamera(mouse, camera);

//             const intersects = raycaster.intersectObjects(scene.children);

//             if(intersects.length > 0) {
//                 const note = intersects[0].object.userData.note;
//                 playNote(note);
//             }
//         };

//         container.addEventListener('click', onMouseClick);

//         function playNote(note) {
//             const encodedNote = encodeURIComponent(note);
//             const audio = new Audio(`sounds/${encodedNote}.mp3`);
//             audio.play();
//         }
//     });
// })