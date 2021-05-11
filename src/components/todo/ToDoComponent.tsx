import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Item from 'antd/lib/list/Item';
import { Radio } from 'antd';
import moment from 'moment';
import {
  Spinner,
  RadioButton,
  ModalComponent,
  TrashIcon,
  DropdownMenu,
} from '../shared';

import ModalTask from './ModalTask';

import { IRootState } from '../../store/rootReducer';
import { ITaskData, ITaskState } from '../../store/tasks/tasks.type';
import {
  getTaskData,
  removeTask,
  updateTask,
} from '../../store/tasks/tasks.actions';
import { getAllUsers } from '../../store/users/users.actions';

import './styles.scss';
import Trash from '../shared/Trash';

interface IOwnProps {
  isActivePage: boolean;
}

const ToDoComponent: FC<IOwnProps> = ({ isActivePage }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const tasksData = useSelector<IRootState, ITaskState['tasks']>(
    state => state.tasks.tasks,
  );

  const [isSpinner, setIsSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [editTaskData, setEditTaskData] = useState({
    farm_id: 0,
    line_id: 0,
    due_date: 0,
  });
  const [deleteTask, setDeleteTask] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState<string | number>('0');
  const [archiveTask, setArchiveTask] = useState(false);
  const [archiveTaskId, setArchiveTaskId] = useState<string | number>('0');

  const getUsers = async () => {
    setIsSpinner(true);
    await dispatch(getAllUsers(history));
    setIsSpinner(false);
  };

  useEffect(() => {
    setIsSpinner(true);
    dispatch(getTaskData(history));
    getUsers();
    setIsSpinner(false);
  }, []);

  const handleOnDeleteRow = (data: ITaskData) => {
    setDeleteTask(true);
    setDeleteTaskId(data.id!);
  };

  const handleOnConfirmDelete = async () => {
    await dispatch(removeTask(Number(deleteTaskId), history));
    setDeleteTask(false);
  };

  const handleOnArchiveRow = (data: ITaskData) => {
    setArchiveTask(true);
    setArchiveTaskId(data.id!);
  };

  const handleOnConfirmArchive = async () => {
    const task = tasksData.find(e => {
      return e.id === archiveTaskId;
    });
    if (task) {
      await dispatch(
        updateTask(
          {
            ...task,
            active: 1,
          },
          history,
        ),
      );
      setArchiveTask(false);
    }
  };

  const handleOnEditTask = (data: any) => {
    setEditTaskData(data);
    setEditTask(true);
  };

  const handleOnConfirmEditTask = () => {
    setEditTask(false);
  };

  return (
    <div className='todo'>
      {!isSpinner &&
        tasksData
          .filter(e => {
            return isActivePage !== !!e.active;
          })
          .map(item => (
            <div className='todo__item pb-20 mb-20 line-bottom' key={item.id}>
              <Radio.Group key={item.id} value={item.active ? 'checked' : ''}>
                <RadioButton
                  label={`Mussel Farm ${item.farm_id} - Line ${item.line_id}`}
                  value='checked'
                  date={moment.unix(item.due_date / 1000).format('DD.MM.YYYY')}
                />
              </Radio.Group>
              {isActivePage ? (
                <DropdownMenu
                  data={item}
                  type='todo'
                  onEdit={handleOnEditTask}
                  onDeleteRow={handleOnDeleteRow}
                  onArchiveRow={handleOnArchiveRow}
                />
              ) : (
                <button
                  style={{ border: 'none', background: 'none' }}
                  onClick={e => {
                    setDeleteTask(true);
                    setDeleteTaskId(item.id!);
                  }}
                >
                  <TrashIcon />
                </button>
              )}
            </div>
          ))}
      {isSpinner && (
        <div className='mt-20'>
          <Spinner />
        </div>
      )}
      <ModalComponent
        visible={deleteTask}
        onCancel={() => setDeleteTask(!deleteTask)}
        type='delete'
        title='Error / Delete'
        text='Do you really want to delete this task?'
        onConfirm={handleOnConfirmDelete}
      />
      <ModalComponent
        visible={archiveTask}
        onCancel={() => setArchiveTask(!archiveTask)}
        type='confirm'
        title='Confirm / Archive'
        text='Do you really want to archive this task?'
        onConfirm={handleOnConfirmArchive}
      />
      <ModalTask
        onCancel={() => setEditTask(!editTask)}
        type='confirm'
        data={editTaskData}
        title='Edit task'
        onConfirm={handleOnConfirmEditTask}
        visible={editTask}
      />
    </div>
  );
};

export default ToDoComponent;
