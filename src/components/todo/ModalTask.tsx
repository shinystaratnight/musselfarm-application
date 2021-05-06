import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import { Datepicker, InputModal, Dropdown } from '../shared';
import { IMainList } from '../../types/basicComponentsTypes';
import { IRootState } from '../../store/rootReducer';
import { IFarmState } from '../../store/farms/farms.type';
import { addTask, updateTask } from '../../store/tasks/tasks.actions';
import './styles.scss';
import { ITaskData } from '../../store/tasks/tasks.type';

interface IOwnProps {
  type: string;
  data?: ITaskData | null;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  visible: boolean;
}

const ModalTask: FC<IOwnProps> = ({
  type,
  onCancel,
  onConfirm,
  title,
  visible,
  data,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const farmsData = useSelector<IRootState, IFarmState['farmsData']>(
    state => state.farms.farmsData,
  );

  const [farm, setFarm] = useState(0);
  const [line, setLine] = useState(0);
  const [date, setDate] = useState(moment().toDate().getTime());

  const items: IMainList[] = [
    { value: '2', label: 'Mussel Farm 2', id: '1' },
    { value: '3', label: 'Mussel Farm 3', id: '2' },
    { value: '1', label: 'Mussel Farm 1', id: '3' },
  ];

  const itemsLine: IMainList[] = [
    { value: '2', label: 'Line 2', id: '1' },
    { value: '3', label: 'Line 3', id: '3' },
    { value: '1', label: 'Line 1', id: '2' },
  ];

  useEffect(() => {
    setFarm(data ? data.farm_id : 0);
    setLine(data ? data.line_id : 0);
    setDate(data ? Number(data.due_date) : moment().toDate().getTime());
  }, [data]);

  const handleOnSelectFarm = (value: string) => {
    setFarm(Number(value));
  };

  const handleOnSelectLine = (value: string) => {
    setLine(Number(value));
  };

  const handleOnConfirm = async () => {
    if (farm !== 0 && line !== 0) {
      if (type === 'create') {
        const newTask: ITaskData = {
          farm_id: farm,
          line_id: line,
          due_date: date,
        };

        await dispatch(addTask(newTask, history));
      } else if (type === 'confirm') {
        const newTask: ITaskData = {
          ...data,
          farm_id: farm,
          line_id: line,
          due_date: date,
        };

        await dispatch(updateTask(newTask, history));
      }
      setFarm(0);
      setLine(0);
      setDate(moment().toDate().getTime());
      onConfirm();
    }
  };

  return (
    <InputModal
      visible={visible}
      onCancel={onCancel}
      title={title}
      type={type}
      onConfirm={handleOnConfirm}
    >
      <Dropdown
        className='mb-16'
        placeholder='select farm'
        defaultValue={farm ? `${farm}` : undefined}
        onChange={(value, event) => handleOnSelectFarm(value)}
        label='Select farm'
        options={items}
      />
      <Dropdown
        className='mb-16'
        placeholder='select line'
        defaultValue={line ? `${line}` : undefined}
        onChange={(value, event) => handleOnSelectLine(value)}
        label='Select line'
        options={itemsLine}
      />
      <Datepicker
        className='mb-24'
        label='Date'
        required
        defaultValue={Number(date)}
        onChange={e =>
          setDate(e ? e!.toDate().getTime() : moment().toDate().getTime())
        }
      />
    </InputModal>
  );
};

export default ModalTask;
