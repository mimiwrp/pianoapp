import React from 'react';

const Modal = ({ lessonName, closeModal }) => {
    return (
        <div className='modal'>
            <div className='modal-content'>
                <span className='close-button' onClick={closeModal}>&times;</span>
                <p>Congratulations! You have completed {lessonName}. Great job!</p>
            </div>
        </div>
    )
}

export default Modal;