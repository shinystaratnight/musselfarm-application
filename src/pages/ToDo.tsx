import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  Button,
  CaretRight,
  ModalComponent,
  PlusIcon,
  TabsComponent,
  Title,
} from '../components/shared';
import { ITab } from '../types/basicComponentsTypes';
import ToDoComponent from '../components/todo/ToDoComponent';
import ModalTask from '../components/todo/ModalTask';
import { useWidth } from '../util/useWidth';
import { removeAllTasks } from '../store/tasks/tasks.actions';

const ToDo = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [activeTab, setActiveTab] = useState('active');
  const [createTask, setCreateTask] = useState(false);
  const [clearCompleted, setClearCompleted] = useState(false);
  const width = useWidth();

  const tabItems: ITab[] = [
    {
      content: <ToDoComponent isActivePage />,
      title: 'Active',
      id: 'active',
    },
    {
      content: <ToDoComponent isActivePage={false} />,
      title: 'Completed',
      id: 'completed',
    },
  ];

  const handleOnAddTask = () => {
    setCreateTask(false);
  };

  const handleOnCreateTask = () => {
    setCreateTask(!createTask);
  };

  const handleOnClear = () => {
    setClearCompleted(!clearCompleted);
  };

  const handleOnClearCompletedTaks = async () => {
    await dispatch(removeAllTasks(history));
    setClearCompleted(false);
  };

  return (
    <>
      <div className='container w-100'>
        <div className='d-flex justify-content-center align-items-center mt-28'>
          <div className='notifications w-100'>
            <div className='mt-28 mb-28 d-flex align-items-center justify-content-between'>
              <Title size={5} color='black-3' align='default' fontWeight={700}>
                To Do List
              </Title>
              <div className='d-flex'>
                {activeTab === 'completed' && (
                  <>
                    <Button
                      className='mr-16'
                      color='blue'
                      size={1}
                      width='small'
                      isNoneBorder
                      type='bordered'
                      onClick={handleOnClear}
                    >
                      Clear completed
                    </Button>
                    <ModalComponent
                      visible={clearCompleted}
                      onCancel={handleOnClear}
                      type='delete'
                      title='Error / Delete'
                      text='Clear all completed tasks?'
                      onConfirm={handleOnClearCompletedTaks}
                    />
                  </>
                )}
                {width > 768 ? (
                  <Button
                    color='blue'
                    onClick={handleOnCreateTask}
                    size={1}
                    width='small'
                    type='fill'
                  >
                    Add task
                  </Button>
                ) : (
                  <Button
                    color='blue'
                    onClick={handleOnCreateTask}
                    size={0}
                    width='default'
                    type='fill'
                    iconOnly
                  >
                    <PlusIcon />
                  </Button>
                )}
                <ModalTask
                  onCancel={handleOnCreateTask}
                  data={null}
                  type='create'
                  title='Create task'
                  onConfirm={handleOnAddTask}
                  visible={createTask}
                />
              </div>
            </div>
            <TabsComponent
              onChange={e => setActiveTab(e)}
              defaultActiveKey='active'
              items={tabItems}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDo;
