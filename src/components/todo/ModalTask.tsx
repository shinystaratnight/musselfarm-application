import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import { Datepicker, InputModal, Dropdown, Input } from '../shared';
import { IMainList } from '../../types/basicComponentsTypes';
import { IRootState } from '../../store/rootReducer';
import { IFarmState } from '../../store/farms/farms.type';
import { ProfileState } from '../../store/profile/profile.type';
import { addTask, updateTask } from '../../store/tasks/tasks.actions';
import { ITaskData } from '../../store/tasks/tasks.type';
import { UsersState } from '../../store/users/users.type';
import './styles.scss';

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
  const profile = useSelector<IRootState, ProfileState['user']>(
    state => state.profile.user,
  );
  const usersStore = useSelector<IRootState, UsersState['users']>(
    state => state.users.users,
  );

  const [farm, setFarm] = useState('0');
  const [line, setLine] = useState('0');
  const [tskTitle, setTskTitle] = useState('');
  const [content, setContent] = useState('');
  const [charger, setCharger] = useState(0);
  const [date, setDate] = useState(moment().toDate().getTime());
  const [itemsLine, setItemsLine] = useState<IMainList[]>([]);

  const items: IMainList[] = farmsData.map(el => {
    return {
      value: el.id.toString(),
      id: el.id.toString(),
      label: el.name,
    };
  });

  useEffect(() => {
    const farmId = data ? data.farm_id : 0;
    setFarm(farmId.toString());
    setLine(data ? data.line_id.toString() : '0');
    setTskTitle(data ? data.title : '');
    setContent(data ? data.content! : '');
    setLine(data ? data.line_id.toString() : '0');
    setDate(data ? Number(data.due_date) : moment().toDate().getTime());
    setCharger(data?.charger_id ? data.charger_id : 0);

    const curFarm = farmsData.find(el => {
      return farmId === el.id;
    });

    setItemsLine(
      curFarm?.lines
        ? curFarm.lines.map(el => {
            return {
              value: el.id.toString(),
              id: el.id.toString(),
              label: el.line_name,
            };
          })
        : [],
    );
  }, [data]);

  const handleOnSelectFarm = (value: string) => {
    setFarm(value);
    const curFarm = farmsData.find(el => {
      return Number(value) === el.id;
    });
    setItemsLine(
      curFarm?.lines
        ? curFarm.lines.map(el => {
            return {
              value: el.id.toString(),
              id: el.id.toString(),
              label: el.line_name,
            };
          })
        : [],
    );
  };

  const handleOnSelectLine = (value: string) => {
    setLine(value);
  };

  const handleOnSelectCharger = (value: string) => {
    setCharger(Number(value));
  };

  const handleOnConfirm = async () => {
    if (title === '') return;
    if (type === 'create') {
      const newTask: ITaskData = {
        farm_id: Number(farm),
        line_id: Number(line),
        title: tskTitle,
        content,
        due_date: date,
        charger_id: charger,
      };

      await dispatch(addTask(newTask, history));
    } else if (type === 'confirm') {
      const newTask: ITaskData = {
        ...data,
        farm_id: Number(farm),
        line_id: Number(line),
        title: tskTitle,
        content,
        due_date: date,
        charger_id: charger,
      };

      await dispatch(updateTask(newTask, history));
    }
    setFarm('0');
    setLine('0');
    setContent('');
    setTskTitle('');
    setCharger(0);
    setDate(moment().toDate().getTime());
    onConfirm();
  };

  return (
    <InputModal
      visible={visible}
      onCancel={onCancel}
      title={title}
      type={type}
      onConfirm={handleOnConfirm}
    >
      <Input
        type='text'
        onChange={e => setTskTitle(e.target.value)}
        className='mb-16 w-100'
        value={tskTitle}
        label='Task title'
        placeholder='task title'
      />
      <Input
        type='textarea'
        onChange={e => setContent(e.target.value)}
        className='mb-16 w-100'
        value={content}
        label='Task content'
        placeholder='task content'
      />
      <Dropdown
        className='mb-16'
        placeholder='select farm'
        defaultValue={farm ? `${farm}` : undefined}
        onChange={(value, event) => handleOnSelectFarm(value)}
        label='Select farm'
        options={[
          {
            value: '0',
            id: '0',
            label: ' -- No Farm -- ',
          },
          ...items,
        ]}
      />
      <Dropdown
        className='mb-16'
        placeholder='select line'
        defaultValue={line ? `${line}` : undefined}
        onChange={(value, event) => handleOnSelectLine(value)}
        label='Select line'
        options={[
          {
            value: '0',
            id: '0',
            label: ' -- No Line -- ',
          },
          ...itemsLine,
        ]}
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
      {profile?.role === 'owner' && (
        <Dropdown
          className='mb-16'
          placeholder='select person responsible'
          defaultValue={charger.toString()}
          onChange={(value, event) => handleOnSelectCharger(value)}
          label='Select person responsible'
          options={[
            {
              value: '0',
              id: '0',
              label: ' -- No Person -- ',
            },
            ...usersStore.map(el => {
              return {
                value: el.id!.toString(),
                id: el.id!.toString(),
                label: el.name,
              };
            }),
          ]}
        />
      )}
    </InputModal>
  );
};

export default ModalTask;
