import React from 'react';
import { Modal } from 'react-bootstrap';

const DeleteAllConfirmationModal = ({ show, onClose, onConfirm }) => {
    return (
        <Modal centered show={show} onHide={onClose}>
            <Modal.Header className='border-0' closeButton>
                <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Do you really want to delete all tasks? This process cannot be undone.</p>
            </Modal.Body>
            <Modal.Footer className='border-0 d-flex justify-content-between'>
                <button className='btn-blue-outline-custom width-custom' onClick={onClose}>
                    Cancel
                </button>
                <button className='btn-red-custom width-custom' onClick={onConfirm}>
                    Delete All
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteAllConfirmationModal;