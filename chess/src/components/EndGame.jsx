import React from 'react';
import Modal from 'react-modal';
import '../styles/WinnerModal.css';  

Modal.setAppElement('#root');

const WinnerModal = ({ isOpen, winner, onClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="modal-content"
            overlayClassName="modal-overlay"
            closeTimeoutMS={900}  
        >
            <div className="modal-body">
                <h2>🏆 Congratulations!</h2>
                <p>{winner} has won the game!</p>
                <button onClick={onClose} className="close-button">Close</button>
            </div>
        </Modal>
    );
};

export default WinnerModal;
