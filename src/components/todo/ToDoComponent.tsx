import React, { FC, useState } from 'react';
import {
  CheckboxButton,
  ModalComponent,
  TrashIcon,
  DropdownMenu,
} from '../shared';

import ModalTask from './ModalTask';

import './styles.scss';

interface IOwnProps {
  isActivePage: boolean;
}

const ToDoComponent: FC<IOwnProps> = ({ isActivePage }) => {
  const [list, setList] = useState([
    {
      id: '5464421223',
      name: 'Mussel Farm 1 - Line 4',
      date: '19.03.2020',
      value: false,
      isOpenDropdown: false,
    },
    {
      id: '3454365356',
      name: 'Mussel Farm 1 - Line 3',
      date: '23.04.2020',
      value: false,
      isOpenDropdown: false,
    },
    {
      id: '76979786786',
      name: 'Mussel Farm 1 - Line 5',
      date: '23.04.2020',
      value: false,
      isOpenDropdown: false,
    },
    {
      id: '435346658769',
      name: 'Mussel Farm 1 - Line 6',
      date: '23.04.2020',
      value: false,
      isOpenDropdown: false,
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);

  const handleOnItem = (value: boolean, id: string) => {
    setList(list.map(item => (item.id === id ? { ...item, value } : item)));
  };

  const handleOnShowModal = (id: string) => {
    setShowModal(!showModal);
  };

  const handleOnEditTask = (data: any) => {
    console.log(data, 'edit');
  };

  return (
    <div className='todo'>
      {list.map(item => (
        <div className='todo__item pb-20 mb-20 line-bottom' key={item.id}>
          <CheckboxButton
            key={item.id}
            label={item.name}
            checked={item.value}
            date={item.date}
            onChange={e => handleOnItem(e.target.checked, item.id)}
          />
          <ModalComponent
            visible={deleteTask}
            onCancel={() => setDeleteTask(!deleteTask)}
            type='delete'
            title='Error / Delete'
            text='This is place holder text. The basic dialog for modals should contain only valuable and relevant information. Simplify dialogs by removing unnecessary elements or content that does not support user tasks. If you find that the number of required elements for your design are making the dialog excessively large, then try a different design solution. '
            onConfirm={() => console.log('onDelete')}
          />
          <ModalTask
            onCancel={() => setEditTask(!editTask)}
            type='confirm'
            title='Edit task'
            onConfirm={() => console.log('onConfirm')}
            visible={editTask}
          />
          {isActivePage ? (
            <DropdownMenu data={item} type='todo' onEdit={handleOnEditTask} />
          ) : (
            <DropdownMenu data={item} type='todo' icon={<TrashIcon />} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ToDoComponent;
