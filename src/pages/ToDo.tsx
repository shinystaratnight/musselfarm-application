import React, { useState } from 'react';

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

const ToDo = () => {
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

  const handleOnCreateTask = () => {
    setCreateTask(!createTask);
  };

  const handleOnClear = () => {
    setClearCompleted(!clearCompleted);
  };

  return (
    <>
      <div className='container w-100'>
        <div className='d-flex justify-content-center align-items-center mt-28'>
          <div className='notifications w-100'>
            <div className='mb-10 d-flex align-items-center justify-content-between'>
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
                      text='This is place holder text. The basic dialog for modals should contain only valuable and relevant information. Simplify dialogs by removing unnecessary elements or content that does not support user tasks. If you find that the number of required elements for your design are making the dialog excessively large, then try a different design solution. '
                      onConfirm={() => console.log('onDelete')}
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
                  type='create'
                  title='Create task'
                  onConfirm={() => console.log('onConfirm')}
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
