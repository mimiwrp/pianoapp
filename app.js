import * as THREE from './node_modules/three/build/three.module.js';
//for 2D no Three.js 
document.addEventListener('DOMContentLoaded', () => {
    const piano = document.getElementById('piano');
    const lessonList = document.getElementById('lesson-list');
    const progressDetails = document.getElementById('progress-details');

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
        { note: 'C5', type: 'white'},
        { note: 'C#5', type: 'black'},
        { note: 'D5', type: 'white'},
        { note: 'D#5', type: 'black'},
        { note: 'E5', type: 'white'},
        { note: 'F5', type: 'white'},
        { note: 'F#5', type: 'black'},
        { note: 'G5', type: 'white'},
        { note: 'G#5', type: 'black'},
        { note: 'A5', type: 'white'},
        { note: 'A#5', type: 'black'},
        { note: 'B5', type: 'white'},
    ];

    const lessons = [
        { name: 'Lesson 1: C Major Scale', notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5']},
        { name: 'Lesson 1: G Major Scale', notes: ['G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F#5', 'G5']},
    ];

    let currentLesson = null;
    let userProgress = {};

    keys.forEach(key => {
        const keyElement = document.createElement('div');
        keyElement.className = `key ${key.type}`;
        keyElement.textContent = key.note;
        keyElement.addEventListener('click', () => playNote(key.note));
        piano.appendChild(keyElement);
    });

    lessons.forEach(lesson => {
        const lessonItem = document.createElement('div');
        lessonItem.className = 'lesson-item';
        lessonItem.textContent = lesson.name;
        lessonItem.addEventListener('click', () => startLesson(lesson));
        lessonList.appendChild(lessonItem);
    })

    function playNote(note) {
        const encodedNote = encodeURIComponent(note);
        const audio = new Audio(`sounds/${encodedNote}.mp3`);
        audio.play();
    }

    function startLesson(lesson) {
        currentLesson = lesson;
        userProgress[lesson.name] = { completed: false, currentNoteIndex: 0};
        highlightNextNote();
    }

    function highlightNextNote() {
        if(currentLesson && !userProgress[currentLesson.name].completed) {
            const noteIndex = userProgress[currentLesson.name].currentNoteIndex;
            const note = currentLesson.notes[noteIndex];
            const keyElement = document.querySelector(`.key:contains(${note})`);
            if(keyElement) {
                keyElement.computedStyleMap.backgroundColor = 'yellow';
                keyElement.addEventListener('click', () => {
                    playNote(note);
                    keyElement.computedStyleMap.backgroundColor = '';
                    userProgress[currentLesson.name].currentNoteIndex++;
                    if(userProgress[currentLesson.name].currentNoteIndex >= currentLesson.notes.length) {
                        userProgress[currentLesson.name].completed = true;
                        updateProgress();
                    }else {
                        highlightNextNote();
                    }
                });
            }
        }
    }

    function updateProgress() {
        progressDetails.innerHTML = '';
        for(const lessonName in userProgress){
            const progressItem = document.createElement('div');
            progressItem.className = 'progress-item';
            progressItem.textContent = `${lessonName}: ${userProgress[lessonName].completed ? 'Completed' : 'In Progress'}`;
            progressDetails.appendChild(progressItem);
        }
    }
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