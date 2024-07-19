import React from 'react';

const Lesson = ({ lessons, startLesson }) => {
    return (
        <div id="lesson">
            <h2>Lessons</h2>
            <div id="lesson-list">
                {lessons.map(lesson => (
                    <div key={lesson.name} className="lesson-item" onClick={() => startLesson(lesson)}>
                        {lesson.name}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Lesson;