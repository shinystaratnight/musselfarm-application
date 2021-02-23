import React, { useState, useEffect, useRef, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { IMainList } from '../../types/basicComponentsTypes';
import randomKey from '../../util/randomKey';
import { hideFeedback, showFeedback } from '../../store/farms/farms.actions';
import { IRootState } from '../../store/rootReducer';
import { IFarmState } from '../../store/farms/farms.type';

import { Datepicker, Dropdown, Input, Feedback } from '../shared';
import toggleSecondMillisecond from '../../util/toggleSecondMillisecond';

interface IEditGroupModal {
  data: any;
  onConfirm: (data: any) => void;
  trigger: boolean;
}

const EditGroupModal: FC<IEditGroupModal> = ({ data, onConfirm, trigger }) => {
  const dispatch = useDispatch();
  const initTrigger = useRef(false);

  const allFeedback = useSelector<IRootState, IFarmState['allFeedback']>(
    state => state.farms.allFeedback,
  );

  const [fieldData, setFieldData] = useState({
    planned_date: moment().toDate().getTime(),
    planned_date_harvest: moment().toDate().getTime(),
    seed_id: '',
    name: '',
    id: '',
  });

  const items: IMainList[] = [
    { value: '1', label: 'K', id: randomKey() },
    { value: '2', label: 'D', id: randomKey() },
  ];

  const handleOnSelectType = (value: string): void => {
    setFieldData(prev => ({ ...prev, seed_id: value }));
  };

  const handleChangeName = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = event.target;
    setFieldData(prev => ({ ...prev, name: value }));
  };

  const fieldValid = () => {
    if (
      Number(fieldData.planned_date) > Number(fieldData.planned_date_harvest)
    ) {
      dispatch(
        showFeedback({
          isMessageModal: true,
          type: 'error',
          message: 'Date seeded cannot be greater than date harvested',
        }),
      );
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (initTrigger.current) {
      const valid = fieldValid();
      if (valid) {
        const validData = {
          ...fieldData,
          planned_date: toggleSecondMillisecond(fieldData.planned_date),
          planned_date_harvest: toggleSecondMillisecond(
            fieldData.planned_date_harvest,
          ),
        };

        onConfirm(validData);
      }
    } else {
      initTrigger.current = true;
    }
  }, [trigger]);

  useEffect(() => {
    const isSeed = items.filter(item => item.label === data?.seed);
    const newData = {
      name: data?.name,
      planned_date: toggleSecondMillisecond(data?.planned_date),
      planned_date_harvest: data?.assessments?.length
        ? toggleSecondMillisecond(data?.planned_date_harvest)
        : toggleSecondMillisecond(data?.planned_date_harvest_original),
      seed_id: isSeed[0]?.value,
      id: data?.id,
    };
    setFieldData(newData);
  }, [data]);

  return (
    <div>
      {allFeedback.map((feedback: any, i: number) => {
        if (feedback.isMessageModal) {
          return (
            <Feedback
              message={feedback.message}
              type={feedback.type}
              theme='light'
              key={feedback.id}
              onClose={() => dispatch(hideFeedback(feedback.id))}
            />
          );
        }

        return '';
      })}
      <Input
        className='mb-16'
        type='text'
        onChange={handleChangeName}
        value={fieldData.name}
        label='Name'
        placeholder='Name'
      />
      <Datepicker
        className='mb-16 mt-16'
        label='Planned date seeded'
        defaultValue={fieldData.planned_date}
        onChange={e =>
          setFieldData(prev => ({
            ...prev,
            planned_date: e
              ? e!.toDate().getTime()
              : moment().toDate().getTime(),
          }))
        }
        required
      />
      <Datepicker
        className='mb-16'
        label='Planned date harvested'
        defaultValue={fieldData?.planned_date_harvest}
        onChange={e => {
          if (
            fieldData.planned_date !== undefined &&
            e &&
            e!.toDate().getTime() < fieldData.planned_date
          ) {
            setFieldData(prev => ({
              ...prev,
              planned_date_harvest: moment().toDate().getTime(),
            }));
          } else {
            setFieldData(prev => ({
              ...prev,
              planned_date_harvest: e
                ? e!.toDate().getTime()
                : moment().toDate().getTime(),
            }));
          }
        }}
        required
      />
      <Dropdown
        className='mb-16'
        placeholder='seed Type'
        onChange={(value, event) => handleOnSelectType(value)}
        label='Seed Type'
        options={items}
        defaultValue={fieldData.seed_id ? fieldData.seed_id : undefined}
      />
    </div>
  );
};

export default EditGroupModal;