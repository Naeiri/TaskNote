import React, { useState } from 'react';
import { SlOptionsVertical } from "react-icons/sl";
import DeleteTaskConfirmationModal from '../alltasks/deletetaskconfirmationmodal.jsx';
import TaskDetailModal from '../alltasks/taskdetailmodal.jsx';
import './archive.scss';

const Archive = ({ labels, archivedTasks, onUnarchiveTask, onDeleteTask }) => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showDeleteTaskConfirmModal, setShowDeleteTaskConfirmModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setShowDetailModal(true);
    };

    const handleDeleteTask = (task) => {
        setTaskToDelete(task);
        setShowDeleteTaskConfirmModal(true);
    };

    const confirmDeleteTask = () => {
        if (taskToDelete) {
            onDeleteTask(taskToDelete);
        }
        setShowDeleteTaskConfirmModal(false);
        setTaskToDelete(null);
    };

    const handleDropdownClick = (e) => {
        e.stopPropagation();
    };

    return (
        <>
            <div className="archive-custom">
                <div className="header-container border-bottom pb-3">
                    <h3>ARCHIVE</h3>
                </div>
                <div className="archive-container mt-4">
                    {archivedTasks.length === 0 ? (
                        <h4 className='pt-5 d-flex justify-content-center text-center color-gray-50'>
                            Archived notes will appear here.
                        </h4>
                    ) : (
                        <div className='task-grid d-flex flex-wrap gap-3'>
                            {archivedTasks.map((task, index) => (
                                <div key={index} className="task-card-wrapper cursor-pointer" onClick={() => handleTaskClick(task)}>
                                    <div className="task-card p-3 rounded d-flex flex-column justify-content-between">
                                        <div className='mb-2 pb-2 border-bottom d-flex justify-content-between align-items-center'>
                                            <h5 className="task-title color-gray-80">{task.name}</h5>
                                            <div className="dropdown" onClick={(e) => handleDropdownClick(e)}>
                                                <button className="no-bg" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <SlOptionsVertical />
                                                </button>
                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <li><a className="dropdown-item" href="#" onClick={(e) => {
                                                        e.stopPropagation();
                                                        onUnarchiveTask(task);
                                                    }}>Unarchive</a></li>
                                                    <li><a className="dropdown-item" href="#" onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteTask(task);
                                                    }}>Delete</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <p className="task-description mb-3 color-gray-80">{task.description}</p>
                                        <div className="task-footer font-12px d-flex justify-content-end align-items-center gap-3">
                                            {task.label && (
                                                <div className="d-flex align-items-center color-gray-50">
                                                    <span className="me-2" style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#CCCCCC' }} />
                                                    <span className="task-label color-gray-50">{task.label}</span>
                                                </div>
                                            )}
                                            {task.dueDate && (
                                                <div className="d-flex align-items-center gap-1 color-gray-50">
                                                    <span>{task.dueDate}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <TaskDetailModal
                show={showDetailModal}
                handleClose={() => setShowDetailModal(false)}
                task={selectedTask}
                labels={labels}
                isArchiveView={true}
            />

            <DeleteTaskConfirmationModal
                show={showDeleteTaskConfirmModal}
                onClose={() => setShowDeleteTaskConfirmModal(false)}
                onConfirm={confirmDeleteTask}
                taskName={taskToDelete?.name || ''}
            />
        </>
    )
}

export default Archive