import React from 'react';
import { Modal } from 'react-bootstrap';
import { BiSolidEdit } from "react-icons/bi";

const TaskDetailModal = ({ show, handleClose, task, handleEdit, labels, isArchiveView = false }) => {

    if (!task) {
        return null;
    }

    const getLabelColor = (labelText) => {
        const label = labels.find(l => l.text === labelText);
        return label ? label.color : '#CCCCCC'; // Default to light gray if label not found
    };

    return (
        <Modal centered show={show} onHide={handleClose}>
            <Modal.Header className='border-0 d-flex flex-column align-items-start'>
                <Modal.Title className='w-100 mb-2 text-wrap'>{task.name}</Modal.Title>
                {(task.date || task.label) && (
                    <div className="d-flex align-items-center gap-3">
                        {task.date && (
                            <p className='color-gray-80 bg-gray-20 px-2 rounded font-12px'>{task.date}</p>
                        )}
                        {task.label && (
                            <p
                                className='px-2 m-0 rounded text-white font-12px'
                                style={{
                                    backgroundColor: getLabelColor(task.label),
                                }}
                            >
                                {task.label}
                            </p>
                        )}
                    </div>
                )}
            </Modal.Header>
            <Modal.Body>
                <p>{task.description}</p>
            </Modal.Body>
            <Modal.Footer className='border-0 bg-gray-20 d-flex justify-content-between align-items-center'>
                {!isArchiveView && (
                    <button className='no-bg p-0 d-flex align-items-center' onClick={() => handleEdit(task)}>
                        <BiSolidEdit />
                    </button>
                )}
                {isArchiveView && <div></div>} {/* Empty div to maintain spacing when edit button is hidden */}
                <button className='color-gray-80 no-bg' onClick={handleClose}>
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default TaskDetailModal;