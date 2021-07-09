import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Dropdown, InputModal, Input } from '../shared';
import {
  addAutomation,
  updateAutomation,
} from '../../store/automation/automation.actions';
import randomKey from '../../util/randomKey';
import { useWidth } from '../../util/useWidth';
import { IRootState } from '../../store/rootReducer';

interface IOwnProps {
  onCancel: () => void;
  onConfirm: () => void;
  visible: boolean;
  className?: string;
  type: boolean;
  data?: any;
}

const ModalAutomation: FC<IOwnProps> = ({
  onConfirm,
  visible,
  onCancel,
  className,
  type,
  data,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const conditionsList = [
    {
      value: 'Seeding',
      label: 'Seeding',
      id: 'seeding',
    },
    {
      value: 'Harvesting',
      label: 'Harvesting',
      id: 'harvesting',
    },
    {
      value: 'Assessment',
      label: 'Assessment',
      id: 'assessment',
    },
  ];

  const actionsList = [
    {
      value: 'Created',
      label: 'Created',
      id: 'created',
    },
    {
      value: 'Completed',
      label: 'Completed',
      id: 'completed',
    },
    {
      value: 'Upcoming',
      label: 'Upcoming',
      id: 'upcoming',
    },
  ];

  const timeList = [-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7];

  const [automationId, setAutomationId] = useState(0);
  const [condition, setCondition] = useState('Seeding');
  const [action, setAction] = useState('Created');
  const [time, setTime] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (data) {
      setAutomationId(data.id);
      setCondition(data.condition);
      setAction(data.action);
      setTime(data.time);
      setTitle(data.outcome.title);
      setDescription(data.outcome.description);
    }
  }, [data]);

  const handleConfirmAction = async (e: any) => {
    if (!type) {
      await dispatch(addAutomation(e, history));
    } else {
      await dispatch(
        updateAutomation(
          {
            id: automationId,
            ...e,
          },
          history,
        ),
      );
    }
    onConfirm();
  };

  return (
    <InputModal
      visible={visible}
      onCancel={() => {
        setCondition('Seeding');
        setAction('Created');
        setTime(0);
        setTitle('');
        setDescription('');
        onCancel();
      }}
      type={!type ? 'create' : 'confirm'}
      title={!type ? 'Add Automation' : 'Edit Automation'}
      onConfirm={() => {
        if (title !== '' && description !== '') {
          handleConfirmAction({ condition, action, time, title, description });
          setCondition('Seeding');
          setAction('Created');
          setTime(0);
          setTitle('');
          setDescription('');
          onCancel();
        }
      }}
    >
      <Dropdown
        className='mr-16 w-100 mb-24'
        placeholder='Choose Condition'
        onChange={value => setCondition(value)}
        label='Condition'
        options={conditionsList}
        defaultValue={condition}
      />
      <Dropdown
        className='mr-16 w-100 mb-24'
        placeholder='Choose Action'
        onChange={value => setAction(value)}
        label='Action'
        options={actionsList}
        defaultValue={action}
      />
      <Dropdown
        className='mr-16 w-100 mb-24'
        placeholder='Choose Time'
        onChange={value => setTime(parseInt(value, 10))}
        label='Time'
        options={timeList.map((timeDays, index) => {
          let label = '';
          if (timeDays === 0) label = 'At the day';
          if (timeDays > 0) label = `${timeDays} Day(s) After`;
          if (timeDays < 0) label = `${-timeDays} Day(s) Before`;
          return {
            value: `${timeDays}`,
            label,
            id: `${index}`,
          };
        })}
        defaultValue={`${time}`}
      />
      <Input
        type='text'
        onChange={e => setTitle(e.target.value)}
        className='mr-16 w-100 mb-24'
        value={title}
        label='Title'
        placeholder='title'
      />
      <Input
        type='textarea'
        onChange={e => setDescription(e.target.value)}
        className='mr-16 w-100 mb-24'
        value={description}
        label='Description'
        placeholder='description'
      />
    </InputModal>
  );
};
export default ModalAutomation;

/*

Action should be: created, completed, upcoming
Time should be have option: before/after and select 1-14 days
Outcome would be: Create task with the title and description.

*/
