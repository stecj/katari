import React from 'react';
import './Alert.css';

function Alert({ message, onClose }) {
    return (
        <div className="alert alert-success">
            <p>{message}</p>
            <button className="close-btn" onClick={onClose}>
                &times;
            </button>
        </div>
    );
}

export default Alert;