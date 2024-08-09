import React, { useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { SlOptionsVertical } from "react-icons/sl";
import DueDate from "../../../assets/icon/due-date-icon.png";
import AddTaskModal from './addtaskmodal.jsx';
import './alltasks.scss';
import DeleteAllConfirmationModal from './deleteallconfirmationmodal.jsx';
import DeleteTaskConfirmationModal from './deletetaskconfirmationmodal.jsx';
import EditTaskModal from './edittaskmodal.jsx';
import TaskDetailModal from './taskdetailmodal.jsx';

const AllTasks = ({ labels, onArchiveTask, tasks, setTasks }) => {
    const [showModal, setShowModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    const [showDeleteTaskConfirmModal, setShowDeleteTaskConfirmModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [completedTasks, setCompletedTasks] = useState(JSON.parse(localStorage.getItem('completedTasks')) || []);

    const [selectedTask, setSelectedTask] = useState(null);
    const [taskToDelete, setTaskToDelete] = useState(null);

    const [allTasksCompleted, setAllTasksCompleted] = useState(false);

    useEffect(() => {
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    }, [completedTasks]);

    const handleAddTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    const handleTaskCompletion = (index) => {
        const completedTask = tasks[index];
        setTasks(tasks.filter((_, i) => i !== index));
        setCompletedTasks([...completedTasks, { ...completedTask, completed: true }]);
    };

    const handleTaskUncompletion = (index) => {
        const uncompletedTask = completedTasks[index];
        setCompletedTasks(completedTasks.filter((_, i) => i !== index));
        setTasks([...tasks, { ...uncompletedTask, completed: false }]);
    };

    const handleCheckboxClick = (e, index, isCompleted) => {
        e.stopPropagation();
        if (isCompleted) {
            handleTaskUncompletion(index);
        } else {
            handleTaskCompletion(index);
        }
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setShowDetailModal(true);
    };

    const handleDropdownClick = (e) => {
        e.stopPropagation(); // Prevent event from bubbling up
    };

    const handleEditTask = (editedTask) => {
        const updatedTasks = tasks.map(task =>
            task === selectedTask ? editedTask : task
        );
        const updatedCompletedTasks = completedTasks.map(task =>
            task === selectedTask ? editedTask : task
        );

        setTasks(updatedTasks);
        setCompletedTasks(updatedCompletedTasks);
        setSelectedTask(null);
        setShowEditModal(false);
        setShowDetailModal(false);
    };

    const openEditModal = (task) => {
        setSelectedTask(task);
        setShowEditModal(true);
        setShowDetailModal(false);
    };

    const handleMarkAllDone = () => {
        if (allTasksCompleted) {
            // Unmark all tasks
            const allTasks = [...completedTasks, ...tasks];
            setTasks(allTasks.map(task => ({ ...task, completed: false })));
            setCompletedTasks([]);
        } else {
            // Mark all tasks as done
            const allTasks = [...tasks, ...completedTasks];
            setCompletedTasks(allTasks.map(task => ({ ...task, completed: true })));
            setTasks([]);
        }
        setAllTasksCompleted(!allTasksCompleted);
    };

    const handleDeleteAllTasks = () => {
        setShowDeleteConfirmModal(true);
    };

    const confirmDeleteAllTasks = () => {
        setTasks([]);
        setCompletedTasks([]);
        setShowDeleteConfirmModal(false);
    };

    const handleDeleteTask = (task) => {
        setTaskToDelete(task);
        setShowDeleteTaskConfirmModal(true);
    };

    const confirmDeleteTask = () => {
        if (taskToDelete) {
            if (taskToDelete.completed) {
                setCompletedTasks(completedTasks.filter(task => task !== taskToDelete));
            } else {
                setTasks(tasks.filter(task => task !== taskToDelete));
            }
        }
        setShowDeleteTaskConfirmModal(false);
        setTaskToDelete(null);
    };

    const handleArchiveTask = (task) => {
        onArchiveTask(task);
        setTasks(tasks.filter(t => t !== task));
        setCompletedTasks(completedTasks.filter(t => t !== task));
    };

    const renderTaskCard = (task, index, isCompleted = false) => (
        <div key={index} className={`task-card-wrapper ${!isCompleted ? 'cursor-pointer' : ''}`} onClick={() => !isCompleted && handleTaskClick(task)}>
            <div className={`task-card p-3 rounded d-flex flex-column justify-content-between ${isCompleted ? 'completed-task' : ''}`}>
                <div className="d-flex justify-content-between align-items-start">
                    <div className="checkbox-wrapper" onClick={(e) => handleCheckboxClick(e, index, isCompleted)}>
                        {isCompleted ? (
                            <ImCheckboxChecked
                                className="checkbox-custom cursor-pointer"
                            />
                        ) : (
                            <ImCheckboxUnchecked
                                className="checkbox-custom cursor-pointer"
                            />
                        )}
                    </div>
                </div>
                <div className='mb-2 pb-2 border-bottom d-flex justify-content-between align-items-center'>
                    <h5 className={`task-title ${isCompleted ? 'text-muted text-decoration-line-through' : 'color-gray-80'}`}>
                        {task.name}
                    </h5>
                    {!isCompleted && (
                        <div className="dropdown" onClick={(e) => handleDropdownClick(e)}>
                            <button className="no-bg" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                <SlOptionsVertical />
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li><a className="dropdown-item" href="#" onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleArchiveTask(task);
                                }}>Archive</a></li>
                                <li><a className="dropdown-item" href="#" onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleDeleteTask(task);
                                }}>Delete</a></li>
                            </ul>
                        </div>
                    )}
                </div>
                <p className={`task-description mb-3 ${isCompleted ? 'text-muted text-decoration-line-through' : 'color-gray-80'}`}>
                    {task.description}
                </p>
                <div className="task-footer font-12px d-flex justify-content-end align-items-center gap-3">
                    {task.label && (
                        <div className={`d-flex align-items-center ${isCompleted ? 'text-muted' : 'color-gray-50'}`}>
                            <span
                                className="me-2"
                                style={{
                                    display: 'inline-block',
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    backgroundColor: labels.find(l => l.text === task.label)?.color || '#CCCCCC'
                                }}
                            />
                            <span className={`task-label ${isCompleted ? 'text-muted' : `color-gray-50 label-${task.label}`}`}>
                                {task.label}
                            </span>
                        </div>
                    )}
                    {task.date && (
                        <>
                            <div>
                                <img src={DueDate} alt="deadline" className='deadline-custom me-1' />
                                <span className={`task-date ${isCompleted ? 'text-muted' : 'color-gray-50'}`}>
                                    {task.date}
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div className='task-custom'>
                <div className="header-container border-bottom pb-3 d-flex align-items-center justify-content-between">
                    <h3>TASKS</h3>
                    <div className='d-flex align-items-center'>
                        <button className='btn-blue-add-custom me-3' onClick={() => setShowModal(true)}>
                            <FaPlus className='fa-plus me-1' />Add Task
                        </button>
                        <h4>Welcome, <span className='color-blue-custom'>User</span></h4>
                    </div>
                </div>

                <div className="content-container mt-4">
                    {tasks.length == 0 && completedTasks.length == 0 ? (
                        <p className='pt-5 d-flex justify-content-center text-center color-gray-50'>
                            It looks like you haven't added any tasks yet. Time to get organized!<br />
                            Click "Add Task" to get started.
                        </p>
                    ) : (
                        <div className='my-tasks-container d-flex flex-column'>
                            <div className="task-grid d-flex flex-wrap gap-3">
                                {tasks.map((task, index) => renderTaskCard(task, index))}
                            </div>

                            {completedTasks.length > 0 && (
                                <>
                                    <h5 className="mt-5 mb-3 pb-2 border-bottom">Marked Done</h5>
                                    <div className="task-grid d-flex flex-wrap gap-3">
                                        {completedTasks.map((task, index) => renderTaskCard(task, index, true))}
                                    </div>
                                </>
                            )}

                            <footer className="footer mt-auto">
                                <div className="d-flex justify-content-end gap-3">
                                    <button className='btn-blue-outline-custom' onClick={handleMarkAllDone}>
                                        {allTasksCompleted ? "Unmark All Done" : "Mark All Done"}
                                    </button>
                                    <button className='btn-red-custom' onClick={handleDeleteAllTasks}>Delete All Tasks</button>
                                </div>
                            </footer>
                        </div>
                    )}
                </div>
            </div>

            <AddTaskModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleAddTask={handleAddTask}
                labels={labels}
            />

            <TaskDetailModal
                show={showDetailModal}
                handleClose={() => setShowDetailModal(false)}
                task={selectedTask}
                handleEdit={openEditModal}
                labels={labels}
                isArchiveView={false}
            />

            <EditTaskModal
                show={showEditModal}
                handleClose={() => setShowEditModal(false)}
                handleEditTask={handleEditTask}
                task={selectedTask}
                labels={labels}
            />

            <DeleteAllConfirmationModal
                show={showDeleteConfirmModal}
                onClose={() => setShowDeleteConfirmModal(false)}
                onConfirm={confirmDeleteAllTasks}
            />

            <DeleteTaskConfirmationModal
                show={showDeleteTaskConfirmModal}
                onClose={() => setShowDeleteTaskConfirmModal(false)}
                onConfirm={confirmDeleteTask}
                taskName={taskToDelete?.name || ''}
            />
        </>
    );
};

export default AllTasks;