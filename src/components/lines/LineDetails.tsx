import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Input, Title, Button } from '../shared';
import { useWidth } from '../../util/useWidth';
import { showFeedback } from '../../store/farms/farms.actions';
import { ILineData } from '../../types/farmTypes';

interface ILineDetails {
  onNext: (value: any) => void;
  lineData: ILineData;
}

const LineDetails: FC<ILineDetails> = ({ onNext, lineData }) => {
  const width = useWidth();
  const dispatch = useDispatch();
  const [fieldData, setFieldData] = useState({
    length: '',
  });

  const handleChangeField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { value, name } = event.target;

    const newValue = value.toString().split('');

    const validValue = newValue
      .filter((word, i) => word !== '-')
      .filter((word, i) => {
        if (i === 0) {
          return word !== '0';
        }
        return word;
      })
      .join('');

    setFieldData(prev => ({ ...prev, [name]: validValue }));
  };

  const onNextHandler = (): null => {
    if (!fieldData.length) {
      dispatch(
        showFeedback({
          isMessage: true,
          type: 'error',
          message: `Fill in the field length`,
        }),
      );
      return null;
    }

    onNext(fieldData);
    return null;
  };

  useEffect(() => {
    setFieldData(prev => ({ ...prev, ...lineData }));
  }, [lineData]);

  return (
    <div className='content'>
      <Title
        className='mb-16'
        size={5}
        color='black'
        align='default'
        fontWeight={700}
      >
        Line details
      </Title>
      <Input
        type='text'
        className='mb-16'
        value={lineData.line_name}
        label='Line Number'
        placeholder='line Number'
        disabled
      />
      <Input
        unit='m'
        type='number'
        value={fieldData.length}
        label='Length'
        placeholder='length'
        name='length'
        onChange={handleChangeField}
      />
      <div className='mt-24 line-button d-flex justify-content-end align-items-center'>
        <Link to={`/farms/${lineData.farm_id}`}>
          <Button
            width={width < 769 ? 'wide' : 'small'}
            size={1}
            type='transparent'
            color='blue'
          >
            Cancel
          </Button>
        </Link>
        <Button
          width={width < 769 ? 'wide' : 'small'}
          size={1}
          type='fill'
          color='blue'
          className='ml-16'
          onClick={onNextHandler}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default LineDetails;
