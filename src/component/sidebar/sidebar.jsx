import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { BiSolidArchiveIn } from "react-icons/bi";
import { FaListCheck, FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { TbLayoutSidebarFilled } from "react-icons/tb";
import './sidebar.scss';

const Sidebar = ({ tasks, archivedTasks, setActivePage, activePage, labels, onAddLabel, onDeleteLabel }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [newLabel, setNewLabel] = useState('');
    const [hoveredLabel, setHoveredLabel] = useState(null);
    const tasksQuantity = tasks.length;
    const archivedTasksQuantity = archivedTasks.length;

    const labelColors = ['#EEA990', '#4F1787', '#EB3678', '#FB773C', '#6C946F'];

    // Handle screen width changes
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1024) {
                setIsOpen(false);
            } else {
                setIsOpen(true);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleAddLabel = (e) => {
        if (e.key === 'Enter' && newLabel.trim()) {
            // Check if the label already exists
            if (labels.some(label => label.text.toLowerCase() === newLabel.toLowerCase().trim())) {
                alert('Duplicate label not allowed');
                return;
            }

            const color = labelColors[labels.length % labelColors.length];
            onAddLabel({ text: newLabel.trim(), color });
            setNewLabel('');
        }
    };

    const handleDeleteLabel = (label) => {
        onDeleteLabel(label.text);
    };

    return (
        <>
            <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
                <div className='p-3 header-menu bg-blue-custom d-flex align-items-center justify-content-between'>
                    {isOpen && <h3 className='color-white'>Menu</h3>}
                    <TbLayoutSidebarFilled
                        className='layout-sidebar-filled color-white cursor-pointer'
                        onClick={toggleSidebar}
                    />
                </div>

                {isOpen && (
                    <Nav className="flex-column m-4">
                        <h6 className='mb-2'>TASKS</h6>
                        <Nav.Link
                            href="#alltasks"
                            onClick={() => setActivePage('alltasks')}
                            className={`nave color-gray-80 ${activePage === 'alltasks' ? 'active' : ''}`}
                        >
                            <div className='d-flex align-items-center justify-content-between'>
                                <div><FaListCheck className='me-2' />All</div>
                                <div className='font-12px quantity-custom bg-blue-custom color-white'>{tasksQuantity}</div>
                            </div>
                        </Nav.Link>

                        <Nav.Link
                            href="#archive"
                            onClick={() => setActivePage('archive')}
                            className={`nave color-gray-80 ${activePage === 'archive' ? 'active' : ''}`}
                        >
                            <div className='d-flex align-items-center justify-content-between'>
                                <div><BiSolidArchiveIn className='me-2' />Archive</div>
                                <div className='font-12px quantity-custom bg-blue-custom color-white'>{archivedTasksQuantity}</div>
                            </div>
                        </Nav.Link>

                        <h6 className='mt-3 mb-2 color-gray-80'>LABELS</h6>
                        {labels.map((label, index) => (
                            <Nav.Link
                                key={index}
                                href={`#${label.text.toLowerCase().replace(/\s+/g, '-')}`}
                                onClick={() => setActivePage(`label-${label.text}`)}
                                className={`nave color-gray-80 d-flex justify-content-between align-items-center ${activePage === `label-${label.text}` ? 'active' : ''}`}
                                onMouseEnter={() => setHoveredLabel(label)}
                                onMouseLeave={() => setHoveredLabel(null)}
                            >
                                <div className='d-flex align-items-center'>
                                    <span
                                        className="me-2"
                                        style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: label.color }}
                                    />
                                    {label.text}
                                </div>
                                {(hoveredLabel === label || activePage === `label-${label.text}`) && (
                                    <MdDelete
                                        className='color-gray-80 cursor-pointer delete-icon'
                                        onClick={(e) => { e.stopPropagation(); handleDeleteLabel(label); }}
                                    />
                                )}
                            </Nav.Link>
                        ))}
                        <div className='d-flex justify-content-between align-items-center'>
                            <FaPlus className='ms-2 color-gray-80' />
                            <input
                                type="text"
                                className="customTextField color-gray-80"
                                placeholder="Add New Label"
                                value={newLabel}
                                onChange={(e) => setNewLabel(e.target.value)}
                                onKeyPress={handleAddLabel}
                            />
                        </div>
                    </Nav>
                )}
            </div>
        </>
    );
}

export default Sidebar;