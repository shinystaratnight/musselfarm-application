import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import { Datepicker, InputModal, Dropdown } from '../shared';
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

  const [farm, setFarm] = useState(0);
  const [line, setLine] = useState(0);
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
    setFarm(farmId);
    setLine(data ? data.line_id : 0);
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
    setFarm(Number(value));
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
    setLine(Number(value));
  };

  const handleOnSelectCharger = (value: string) => {
    setCharger(Number(value));
  };

  const handleOnConfirm = async () => {
    if (farm !== 0 && line !== 0) {
      if (type === 'create') {
        const newTask: ITaskData = {
          farm_id: farm,
          line_id: line,
          due_date: date,
          charger_id: charger,
        };

        await dispatch(addTask(newTask, history));
      } else if (type === 'confirm') {
        const newTask: ITaskData = {
          ...data,
          farm_id: farm,
          line_id: line,
          due_date: date,
          charger_id: charger,
        };

        await dispatch(updateTask(newTask, history));
      }
      setFarm(0);
      setLine(0);
      setCharger(0);
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
      {profile?.role === 'owner' && (
        <Dropdown
          className='mb-16'
          placeholder='select charger'
          defaultValue={charger.toString()}
          onChange={(value, event) => handleOnSelectCharger(value)}
          label='Select charger'
          options={[
            {
              value: '0',
              id: '0',
              label: ' -- No Charger -- ',
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
