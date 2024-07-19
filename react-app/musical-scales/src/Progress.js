import React from 'react';

const Progress = ({ userProgress }) => {
    return (
        <div id="progress">
            <h2>Progress</h2>
            <div id="progress-details">
                {Object.keys(userProgress).map(lessonName => (
                    <div key={lessonName} className="progress-item">
                        {`${lessonName}: ${userProgress[lessonName].completed ? 'Completed' : 'In Progress'}`}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Progress;