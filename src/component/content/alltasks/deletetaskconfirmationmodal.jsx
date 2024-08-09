import React from 'react';
import { Modal } from 'react-bootstrap';

const DeleteTaskConfirmationModal = ({ show, onClose, onConfirm, taskName }) => {
    if (!show) return null;

    return (
        <Modal centered show={show} onHide={onClose}>
            <Modal.Header className='border-0' closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete the task "<strong>{taskName}</strong>"?</p>
            </Modal.Body>
            <Modal.Footer className='border-0 d-flex justify-content-between'>
                <button className='btn-blue-outline-custom width-custom' onClick={onClose}>
                    Cancel
                </button>
                <button className='btn-blue-custom width-custom' onClick={onConfirm}>
                    Delete Task
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteTaskConfirmationModal;