import React, { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import './alltasks.scss';

const AddTaskModal = ({ show, handleClose, handleAddTask, labels }) => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskLabel, setTaskLabel] = useState('');
    const [taskDate, setTaskDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddTask({ name: taskName, description: taskDescription, label: taskLabel, date: taskDate });
        setTaskName('');
        setTaskDescription('');
        setTaskLabel('');
        setTaskDate('');
        handleClose();
    };

    const handleCancel = () => {
        handleClose();
        setTaskName('');
        setTaskDescription('');
        setTaskLabel('');
        setTaskDate('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey && taskName.trim() !== '') {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <>
            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Title"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                                onKeyDown={handleKeyDown}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Description"
                                value={taskDescription}
                                onChange={(e) => setTaskDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 d-flex justify-content-between align-items-center">
                            <Form.Label className='me-4'>Label</Form.Label>
                            <Form.Select
                                className='ms-5'
                                value={taskLabel}
                                onChange={(e) => setTaskLabel(e.target.value)}
                            >
                                <option value="">Select a label</option>
                                {labels.map((label, index) => (
                                    <option key={index} value={label.text}>
                                        {label.text}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3 d-flex justify-content-between align-items-center">
                            <Form.Label>Deadline</Form.Label>
                            <Form.Control
                                type='date'
                                className='ms-5'
                                value={taskDate}
                                onChange={(e) => setTaskDate(e.target.value)}
                            />
                        </Form.Group>
                        <div className="mt-5 d-flex justify-content-between">
                            <button className='btn-blue-outline-custom width-custom me-1' onClick={handleCancel}>
                                Cancel
                            </button>
                            <button className='btn-blue-custom width-custom' type="submit">
                                Add Task
                            </button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AddTaskModal;