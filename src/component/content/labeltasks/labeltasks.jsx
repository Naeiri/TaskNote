import React from 'react';
import DueDate from "../../../assets/icon/due-date-icon.png";
import '../alltasks/alltasks.scss';

const LabelTasks = ({ tasks, labelName }) => {
    const labelTasks = tasks.filter(task => task.label === labelName);

    const renderTaskCard = (task, index) => (
        <div key={index} className="task-card-wrapper">
            <div className='task-card p-3 rounded d-flex flex-column justify-content-between'>
                <div className='mb-2 pb-2 border-bottom d-flex justify-content-between align-items-center'>
                    <h5 className="task-title color-gray-80">
                        {task.name}
                    </h5>
                </div>
                <p className="task-description mb-3 color-gray-80">
                    {task.description}
                </p>
                <div className="task-footer font-12px d-flex justify-content-end align-items-center gap-3">
                    {task.date && (
                        <div>
                            <img src={DueDate} alt="deadline" className='deadline-custom me-1' />
                            <span className="task-date color-gray-50">
                                {task.date}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className='task-custom'>
            <div className="header-container border-bottom pb-3 d-flex align-items-center justify-content-between">
                <h3>{labelName}</h3>
            </div>
            <div className="content-container mt-4">
                {labelTasks.length === 0 ? (
                    <p className='pt-5 d-flex justify-content-center text-center color-gray-50'>
                        No tasks with this label yet. Add a task and assign this label to see it here!
                    </p>
                ) : (
                    <>
                        <div className='my-tasks-container d-flex flex-column'>
                            <div className="task-grid d-flex flex-wrap gap-3">
                                {labelTasks.map((task, index) => renderTaskCard(task, index))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default LabelTasks;