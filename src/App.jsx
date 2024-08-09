import React, { useEffect, useState } from 'react';
import AllTasks from './component/content/alltasks/alltasks';
import Archive from './component/content/archive/archive';
import LabelTasks from './component/content/labeltasks/labeltasks';
import Sidebar from './component/sidebar/sidebar';

function App() {
  const [activePage, setActivePage] = useState('alltasks');
  const [labels, setLabels] = useState(JSON.parse(localStorage.getItem('labels')) || []);
  const [archivedTasks, setArchivedTasks] = useState(JSON.parse(localStorage.getItem('archivedTasks')) || []);
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);

  useEffect(() => {
    localStorage.setItem('labels', JSON.stringify(labels));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('archivedTasks', JSON.stringify(archivedTasks));
  }, [labels, tasks, archivedTasks]);

  const handleAddLabel = (newLabel) => {
    setLabels([...labels, newLabel]);
  };

  const handleArchiveTask = (task) => {
    setArchivedTasks([...archivedTasks, task]);
  };

  const handleUnarchiveTask = (task) => {
    setTasks([...tasks, task]);
    setArchivedTasks(archivedTasks.filter(t => t !== task));
  };

  const handleDeleteArchivedTask = (task) => {
    setArchivedTasks(archivedTasks.filter(t => t !== task));
  };

  const handleDeleteLabel = (labelToDelete) => {
    setLabels(labels.filter(label => label.text !== labelToDelete));

    // Remove tasks associated with the deleted label in the active tasks
    setTasks(tasks.map(task => {
      if (task.label === labelToDelete) {
        return { ...task, label: null };
      }
      return task;
    }));

    setArchivedTasks(archivedTasks.map(task => {
      if (task.label === labelToDelete) {
        return { ...task, label: null };
      }
      return task;
    }));
  };


  const renderContent = () => {
    if (activePage.startsWith('label-')) {
      const labelName = activePage.slice(6); // Remove 'label-' prefix
      // Check if the label still exists in the labels array
      const label = labels.find(l => l.text === labelName);
      if (label) {
        return <LabelTasks
          tasks={tasks}
          labelName={labelName}
        />;
      } else {
        // If the label doesn't exist
        setActivePage('alltasks');
        return <AllTasks labels={labels} onArchiveTask={handleArchiveTask} tasks={tasks} setTasks={setTasks} />;
      }
    }

    switch (activePage) {
      case 'alltasks':
        return <AllTasks labels={labels} onArchiveTask={handleArchiveTask} tasks={tasks} setTasks={setTasks} />;
      case 'archive':
        return <Archive labels={labels} archivedTasks={archivedTasks} onUnarchiveTask={handleUnarchiveTask} onDeleteTask={handleDeleteArchivedTask} />;
    }
  };

  return (
    <>
      <div className="d-flex ms-3">
        <Sidebar
          tasks={tasks}
          archivedTasks={archivedTasks}
          setActivePage={setActivePage}
          activePage={activePage}
          labels={labels}
          onAddLabel={handleAddLabel}
          onDeleteLabel={handleDeleteLabel}
        />
        <div className="content p-4">
          {renderContent()}
        </div>
      </div>
    </>
  )
}

export default App